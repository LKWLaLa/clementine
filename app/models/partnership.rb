class Partnership < ApplicationRecord
  belongs_to :sale
  delegate :buyer, to: :sale
  has_one :buyer, through: :sale
  delegate :item, to: :sale
  has_one :item, through: :sale
  belongs_to :invitee, class_name: :User, foreign_key: "invitee_id"
end
