class ItemType < ApplicationRecord
  has_many :items
  has_many :prices
  belongs_to :event

  def current_price(user) 
    user.lowest_price_for_item_type(self)
  end

  def current_price_amount(user)
    p = self.current_price(user)
    p.try(:amount).try(:to_f) || "sold out"
  end

  def current_price_type(user)
    p = self.current_price(user)
    p.try(:price_type) || "sold out"
  end

  def quantity_remaining_at_current_price(user)
    p = self.current_price(user)
    if (p && !p.private) 
      return p.quantity_remaining
    else
      return 0
    end
  end

  def next_price_type(user)
    p = self.current_price(user)
    if (!p.private)
      return self.next_public_price.try(:price_type)
    else
      return nil
    end
  end

  def private_price(user)
    # is the current price for the given user private?
    p = self.current_price(user)
    return p.private
  end

  def remaining_public_prices
    self.prices.select{|price| (price.supply > price.quantity_sold && !price.private)}
  end

  def current_public_price
    self.remaining_public_prices.min_by(&:priority)
  end

  def next_public_price
    self.remaining_public_prices.sort_by(&:priority)[1]
  end

  def sold_out
  	!self.remaining_public_prices.any?
  end

  def self.all_active
    self.joins(:event).where({events: {active: true}})
  end
end
