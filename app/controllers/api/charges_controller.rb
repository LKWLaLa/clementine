class Api::ChargesController < ApplicationController

  def create
    # Amount in cents
    @amount = 500

    #not sending any params over - structure?  What needs to be here?

    #We need to log customer out of stripe when they log out of clementine
   
    charge = Stripe::Charge.create(
      :source      => params[:source],
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    binding.remote_pry

    render json: {ok: true}, status: 201 

  rescue Stripe::CardError => e
    render json: {error: e}    
  end 
 
 private

    def charge_params
      params.permit(:source)
    end

end
