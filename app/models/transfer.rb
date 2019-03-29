class Transfer < ApplicationRecord
	belongs_to :from_sale, class_name: 'Sale', foreign_key: 'from_sale_id'
	belongs_to :to_sale, class_name: 'Sale', foreign_key: 'to_sale_id'
	has_one :from_user, through: :from_sale, source: :user
	has_one :to_user, through: :to_sale, source: :user
	has_one :item, through: :from_sale, source: :item
end