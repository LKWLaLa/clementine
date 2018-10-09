class PartnershipSerializer < ActiveModel::Serializer
	attributes :id, :buyer, :item
	belongs_to :invitee, serializer: UserSerializer
end