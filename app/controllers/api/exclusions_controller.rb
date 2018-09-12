class Api::ExclusionsController < ApplicationController
  def index
    @exclusions = Exclusion.all
    render json: @exclusions, status: 200
  end
end