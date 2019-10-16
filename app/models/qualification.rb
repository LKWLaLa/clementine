class Qualification < ApplicationRecord
	belongs_to :qualified_item, foreign_key: :qualified_item_id, class_name: "Item"
	belongs_to :qualifier_item, foreign_key: :qualifier_item_id, class_name: "Item"
	has_one :item_type, through: :qualified_item
	has_one :event, through: :item_type

	def self.all_active
		self.joins(:event).where({events: {active: true}})
	end
end
