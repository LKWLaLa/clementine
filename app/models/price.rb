class Price < ApplicationRecord
  belongs_to :item_type
  has_many :sales
  has_many :items, through: :item_type
  validates_presence_of :price_type, :amount
end