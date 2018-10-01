class ItemType < ApplicationRecord
  has_many :items
  has_many :prices

  def remaining_prices
  	self.prices.select{|price| price.supply > price.quantity_sold}
  end

  def current_price
  	self.remaining_prices.min_by(&:priority)
  end

  def next_price
    self.remaining_prices.sort_by(&:priority)[1]
  end

  def sold_out
  	!self.remaining_prices.any?
  end
end
