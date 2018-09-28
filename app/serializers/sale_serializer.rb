class SaleSerializer < ActiveModel::Serializer
	attributes :id, :user_id, :item_id, :price

	def price
		object.price
	end
end