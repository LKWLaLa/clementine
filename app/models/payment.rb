class Payment < ApplicationRecord
  belongs_to :user
  has_many :sales

  validates_presence_of :user_id, :amount

  #display name for Active Admin
  def display_name
    id 
  end

end
