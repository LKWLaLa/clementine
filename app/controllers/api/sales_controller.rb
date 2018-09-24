class Api::SalesController < ApplicationController

  def create
    # Amount must be in cents
    # Description will be the items purchased

    charge = Stripe::Charge.create(
      :source      => params[:source],
      :amount      => params[:amount],
      :description => params[:description],
      :currency    => 'usd'
    )

    payment = Payment.new(
      user_id: current_user.id,
      amount: params[:amount] / 100,
      method: 'credit card'
    )
    payment.save if payment.valid?

    params[:purchases].each do |p|
      sale = Sale.new(
        user_id: current_user.id,
        item_id: p[:id],
        price_id: p[:current_price_info][:id],
        payment_id: payment.id
      )
      sale.save if sale.valid?
    end

    params[:upgrades].each do |u|
      sale = Sale.new(
        user_id: current_user.id,
        item_id: u[:upgrade_to_item_id],
        price_id: u[:upgrade_to_price][:id],
        payment_id: payment.id
      )
      sale.save if sale.valid?
      Sale.find_by(id: u[:prior_sale_id]).update(void: true)
    end

    render json: {ok: true}, status: 201 

  rescue Stripe::CardError => e
    render json: {error: e}, status: 500    
  end

  def exchange
    params[:exchanges].each do |e|
      binding.remote_pry
      
      prior_sale = Sale.find_by(id: e[:prior_sale_id])
      sale = Sale.new(
        user_id: current_user.id,
        item_id: e[:upgrade_to_item_id],
        price_id: prior_sale.price_id,
        payment_id: prior_sale.payment.id
      )
      sale.save if sale.valid?
      prior_sale.update(void: true)
    end
  end
 
  def index
    @sales = Sale.where(user_id: current_user.id).select {|sale| !sale.void}
    render json: @sales, status: 200
  end

  private

    def sale_params
      params.permit(:source, :amount, :description, :purchases, :upgrades)
    end

    def exchange_params
      params.permit(:exchanges)
    end

end
