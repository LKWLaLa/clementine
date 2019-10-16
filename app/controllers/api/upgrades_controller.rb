class Api::UpgradesController < ApplicationController
  def index
    @upgrades = current_event.upgrades
    render json: @upgrades, status: 200
  end
end