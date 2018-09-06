class ChargesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    # Amount in cents
    @amount = 500

    #We need to log customer out of stripe when they log out of clementine
    customer = Stripe::Customer.create(
      :email => params[:stripeEmail],
      :source  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    binding.pry

    flash[:notice] = "Thank you for your payment!" 
    redirect_to root_path

  rescue Stripe::CardError => e
    flash[:error] = e.message
    redirect_to new_charge_path
  end 
  

end
