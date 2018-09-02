class Sale < ApplicationRecord
  belongs_to :price
  belongs_to :user
  belongs_to :item
  belongs_to :payment
end
