class Api::ItemTypesController < ApplicationController
  def index
    @item_types = ItemType.all
    render json: @item_types, status: 200
  end
end