class Api::UsersController < ApplicationController
before_action :authenticate_user!

  def current_info
    @user = current_user
    render json: @user, status: 200
  end
  
end