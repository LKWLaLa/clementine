class User < ApplicationRecord
  has_many :payments
  has_many :sales
end