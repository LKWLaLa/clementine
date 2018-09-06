class Upgrade < ApplicationRecord
	belongs_to :upgrade_from_item, foreign_key: :upgrade_from_item_id, class_name: "Item"
	belongs_to :upgrade_to_item, foreign_key: :upgrade_to_item_id, class_name: "Item"
end
