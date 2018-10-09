class PartnershipSerializer < ActiveModel::Serializer
	attributes :id, :item
	belongs_to :buyer, serializer: UserSerializer
	belongs_to :invitee, serializer: UserSerializer
end