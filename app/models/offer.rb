class Offer < ApplicationRecord
	belongs_to :user
	belongs_to :price
	has_one :item_type, through: :price
	has_one :event, through: :item_type

	def self.all_active
		self.joins(:event).where({events: {active: true}})
	end
end
