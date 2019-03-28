class Offer < ApplicationRecord
	belongs_to :user
	belongs_to :price
	has_one :item_type, through: :price
end
