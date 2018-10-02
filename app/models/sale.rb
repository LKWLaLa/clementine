class Sale < ApplicationRecord
  belongs_to :price
  belongs_to :user
  belongs_to :item
  belongs_to :payment

  validates_presence_of :price_id, :user_id, :item_id

  #display name for active admin
  def display_name
    id
  end
end
