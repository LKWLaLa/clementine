class Api::UsersController < ApplicationController
before_action :authenticate_user!

  def user_info
    @user = current_user
    render json: @user, status: 200
  end

  def all
  	render json: User.all, status: 200
  end
  
end