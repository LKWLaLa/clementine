class Api::ItemTypesController < ApplicationController
  def index
    @item_types = current_event.item_types
    render json: @item_types, current_user: current_user, status: 200
  end
end