class Api::QualificationsController < ApplicationController
  def index
    @qualifications = Qualification.all
    render json: @qualifications, status: 200
  end
end