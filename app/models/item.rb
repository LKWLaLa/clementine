class Item < ApplicationRecord
  belongs_to :item_type
  has_many :sales
end
