class Api::EventsController < ApplicationController
	def event_info
		render json: current_event, status: 200
	end
end