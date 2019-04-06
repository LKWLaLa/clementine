class Api::SalesController < ApplicationController

  def create
    # TODO:  Implement transactions here.
    # Since we can't roll back a credit card transaction made by Stripe,
    # (without going through the refund process), we should check to make sure
    # we have all the data that the database requires to successfully record
    # the transaction before sending the charge to Stripe.

    # Amount must be in cents
    # Description will be the items purchased

    payment = Payment.new(
      user_id: current_user.id,
      amount: params[:amount] / 100,
      method: params[:amount] == 0 ? 'None' : 'Stripe'
    )
    if (!payment.valid?)
      return render json: {error: payment.errors}, status: 500 
    end

    sales = []
    void_sales = []

    params[:purchases].each do |p|
      sale = Sale.new(
        user_id: current_user.id,
        item_id: p[:id],
        price_id: p[:current_price_info][:id],
        payment: payment
      )
      if (!sale.valid?)
        return render json: {error: sale.errors}, status: 500
      end
      sales.push(sale)
    end

    params[:upgrades].each do |u|
      sale = Sale.new(
        user_id: current_user.id,
        item_id: u[:upgrade_to_item][:id],
        price_id: u[:upgrade_to_item][:current_price_info][:id],
        payment: payment
      )
      if (!sale.valid?)
        return render json: {error: sale.errors}, status: 500
      end
      sales.push(sale)

      # void prior sale
      prior_sale = Sale.find_by(id: u[:prior_sale][:id])
      prior_sale.update_attributes(void: true)
      if (!prior_sale.valid?) 
        return render json: {error: prior_sale.errors}, status: 500
      end
      void_sales.push(prior_sale)
    end


    if (!payment.amount == 0)
      charge = Stripe::Charge.create(
        :source      => params[:source],
        :amount      => params[:amount],
        :description => params[:description],
        :currency    => 'usd',
        :receipt_email => current_user.email
      )
    end

    payment.save
    sales.each do |sale|
      sale.save
    end
    void_sales.each do |void_sale|
      void_sale.save
    end

    # if contest_sale = sales.find{|sale| sale.item.partnered == true}
    #   if params[:partner_id].present?
    #     partnership = Partnership.new(sale_id: contest_sale.id, invitee_id: params[:partner_id])
    #   else
    #     partnership = Partnership.new(sale_id: contest_sale.id, invitee_id: nil)  
    #   end
    #   partnership.save if partnership.valid?
    # end

    partnered_sales = sales.select{|sale| sale.item.partnered}
    partnered_sales.each do |sale|
      paramPartnership = params[:new_partnerships].find{|np| np[:item][:id] == sale.item.id}
      if paramPartnership['invitee']
        partnership = Partnership.new(sale_id: sale.id, invitee_id: paramPartnership[:invitee][:id])
      else
        partnership = Partnership.new(sale_id: sale.id, invitee_id: nil)
      end
      partnership.save if partnership.valid?
    end


    render json: {ok: true}, status: 201 

  rescue Stripe::CardError => e
    body = e.json_body
    err  = body[:error]
    render json: {error: err[:message]}, status: 500
  end

  def exchange
    params[:exchanges].each do |e|
      #binding.remote_pry
      
      prior_sale = Sale.find_by(id: e[:prior_sale][:id])
      sale = Sale.new(
        user_id: current_user.id,
        item_id: e[:upgrade_to_item][:id],
        price_id: prior_sale.price_id,
        payment_id: prior_sale.payment_id
      )
      sale.save if sale.valid?
      prior_sale.update(void: true)
    end

    render json: {ok: true}, status: 201
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
