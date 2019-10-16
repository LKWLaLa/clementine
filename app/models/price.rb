class Price < ApplicationRecord
  belongs_to :item_type
  has_many :sales
  has_many :items, through: :item_type
  validates_presence_of :price_type, :amount
  has_one :event, through: :item_type
  has_many :offers

  def quantity_sold
  	self.sales.where(void: false).count
  end

  def quantity_remaining
  	self.supply - self.quantity_sold
  end

  def sold_out
    self.quantity_remaining <= 0
  end

  def display_name
    self.price_type + " " + self.item_type.name
  end

  def self.all_active
    self.joins(:event).where({events: {active: true}})
  end
end