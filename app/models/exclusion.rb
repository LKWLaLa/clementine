class Exclusion < ApplicationRecord
	belongs_to :excluder_item, foreign_key: "excluder_item_id", class_name: "Item"
	belongs_to :excluded_item, foreign_key: "excluded_item_id", class_name: "Item"
end
