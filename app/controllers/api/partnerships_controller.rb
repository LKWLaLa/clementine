class Api::PartnershipsController < ApplicationController
	def buyer_partnerships
    	render json: current_user.buyer_partnerships, status: 200
    end

    def invitee_partnerships
    	render json: current_user.invitee_partnerships, status: 200
    end
end