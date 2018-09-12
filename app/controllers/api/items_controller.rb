class Api::ItemsController < ApplicationController
  def index
    @items = Item.all
    render json: @items, status: 200
  end
end