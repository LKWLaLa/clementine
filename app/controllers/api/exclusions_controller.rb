class Api::ExclusionsController < ApplicationController
  def index
    @exclusions = current_event.exclusions
    render json: @exclusions, status: 200
  end
end