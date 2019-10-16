class Qualification < ApplicationRecord
	belongs_to :qualified_item, foreign_key: :qualified_item_id, class_name: "Item"
	belongs_to :qualifier_item, foreign_key: :qualifier_item_id, class_name: "Item"
	has_one :event, through: :qualified_item

	def self.all_active
		self.joins(:event).where({events: {active: true}})
	end
end
