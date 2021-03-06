class Sale < ApplicationRecord
  belongs_to :price
  belongs_to :user
  belongs_to :item
  belongs_to :payment
  belongs_to :buyer, class_name: :User, foreign_key: "user_id"
  has_one :partnership
  has_one :item_type, through: :item
  has_one :event, through: :item_type

  validates_presence_of :price_id, :user_id, :item_id

  #display name for active admin
  def display_name
    id
  end

  def self.all_active
    self.joins(:event).where({events: {active: true}})
  end
end
