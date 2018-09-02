class Sale < ApplicationRecord
  belongs_to :price
  belongs_to :user
  belongs_to :item
  belongs_to :payment

  #display name for active admin
  def display_name
    id
  end
end
