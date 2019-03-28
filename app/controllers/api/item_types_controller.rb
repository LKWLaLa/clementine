class Api::ItemTypesController < ApplicationController
  def index
    @item_types = ItemType.all
    render json: @item_types, current_user: current_user, status: 200
  end
end