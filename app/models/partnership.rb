class Partnership < ApplicationRecord
  belongs_to :sale
  delegate :buyer, to: :sale
  delegate :item, to: :sale
  belongs_to :invitee, class_name: :User, foreign_key: "invitee_id"
end
