class Exclusion < ApplicationRecord
	belongs_to :excluder_item, foreign_key: :excluder_item_id, class_name: "Item"
	belongs_to :excluded_item, foreign_key: :excluded_item_id, class_name: "Item"
	has_one :item_type, through: :excluder_item
	has_one :event, through: :item_type

	def self.all_active
		self.joins(:event).where({events: {active: true}})
	end
end

