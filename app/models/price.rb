class Price < ApplicationRecord
  belongs_to :item_type
  has_many :sales
  has_many :items, through: :item_type
  validates_presence_of :price_type, :amount

  def quantity_sold
  	self.sales.count
  end

  def quantity_remaining
  	self.supply - self.quantity_sold
  end

  def sold_out
    self.quantity_remaining <= 0
  end
end