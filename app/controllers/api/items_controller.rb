class Api::ItemsController < ApplicationController
  def index
    @items = current_event.items
    render json: @items, current_user: current_user, status: 200
  end
end