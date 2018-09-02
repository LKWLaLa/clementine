class ItemType < ApplicationRecord
  has_many :items
  has_many :prices
end
