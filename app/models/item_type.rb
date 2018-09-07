class ItemType < ApplicationRecord
  has_many :items
  has_many :prices

  def current_price
  	self.prices.select{|price| price.inventory > 0}.min_by(&:priority)
  end
end
