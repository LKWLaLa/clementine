class Api::EventVolunteersController < ApplicationController
  
  def set
  	if params[:volunteer]
  		EventVolunteer.create({user_id: params[:user_id], event_id: params[:event_id]})
  	else
  		v = EventVolunteer.where(user_id: params[:user_id], event_id: params[:event_id]).delete_all
  	end
  	render json: {ok: true}, status: 201
  end

end