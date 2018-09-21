class ItemType < ApplicationRecord
  has_many :items
  has_many :prices

  def remaining_prices
  	self.prices.select{|price| price.supply > Sale.where(:price_id => price.id).count}
  end

  def current_price
  	self.remaining_prices.min_by(&:priority)
  end

  def sold_out
  	!self.remaining_prices.any?
  end
end
