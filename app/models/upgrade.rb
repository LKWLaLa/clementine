class Upgrade < ApplicationRecord
	belongs_to :upgrade_from_item, foreign_key: :upgrade_from_item_id, class_name: "Item"
	belongs_to :upgrade_to_item, foreign_key: :upgrade_to_item_id, class_name: "Item"
	has_one :item_type, through: :upgrade_from_item
	has_one :event, through: :item_type

	def self.all_active
		self.joins(:event).where({events: {active: true}})
	end
end
