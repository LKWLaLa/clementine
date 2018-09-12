class Price < ApplicationRecord
  belongs_to :item_type
  has_many :sales
  has_many :items, through: :item_type
  validates_presence_of :price_type, :amount

  def quantity_sold
  	this.sales.count
  end

  def quantity_remaining
  	this.supply - this.quantity_sold
  end

end