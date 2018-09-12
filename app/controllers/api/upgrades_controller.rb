class Api::UpgradesController < ApplicationController
  def index
    @upgrades = Upgrade.all
    render json: @upgrades, status: 200
  end
end