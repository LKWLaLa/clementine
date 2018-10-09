class Api::PartnershipsController < ApplicationController
	def buyer_partnerships
    	render json: current_user.buyer_partnerships, status: 200
    end

    def invitee_partnerships
    	render json: current_user.invitee_partnerships, status: 200
    end

    def update
    	if partnership = Partnership.find_by(id: params[:id])
    		partnership.update(invitee_id: params['invitee_id'])
    		render json: partnership, status: 200
    	else
    		render json: {}, status: 404
    	end
    end
end