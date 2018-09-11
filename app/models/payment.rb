class Payment < ApplicationRecord
  belongs_to :user
  has_many :sales

  validates_presence_of :user_id, :amount
end
