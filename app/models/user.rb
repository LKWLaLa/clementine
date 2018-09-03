class User < ApplicationRecord
  has_many :payments
  has_many :sales
  has_many :items, through: :sales
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
