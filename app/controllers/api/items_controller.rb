class Api::ItemsController < ApplicationController
  def index
    @items = Item.all
    render json: @items, current_user: current_user, status: 200
  end
end