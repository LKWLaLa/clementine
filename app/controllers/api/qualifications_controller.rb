class Api::QualificationsController < ApplicationController
  def index
    @qualifications = current_event.qualifications
    render json: @qualifications, status: 200
  end
end