class Partnership < ApplicationRecord
  belongs_to :sale
  has_one :buyer, through: :sale
  has_one :item, through: :sale
  has_one :item_type, through: :item
  has_one :event, through: :item_type
  belongs_to :invitee, class_name: :User, foreign_key: "invitee_id", optional: true

  def self.all_active
    self.joins(:event).where({events: {active: true}})
  end
end
