class PartnershipSerializer < ActiveModel::Serializer
	attributes :id, :item, :sale
	belongs_to :buyer, serializer: UserSerializer
	belongs_to :invitee, serializer: UserSerializer
end