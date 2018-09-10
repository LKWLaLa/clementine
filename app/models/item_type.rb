class ItemType < ApplicationRecord
  has_many :items
  has_many :prices

  def current_price
  	self.prices.select{|price| price.supply > Sale.where(:price_id => price.id).count}.min_by(&:priority)
  end
end
