class Api::ChargesController < ApplicationController

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

    #binding.remote_pry

    render json: {ok: true}, status: 201 

  rescue Stripe::CardError => e
    render json: {error: e}, status: 500    
  end 
 
 private

    def charge_params
      params.require(:charge).permit(:source, :amount, :description)
    end

end