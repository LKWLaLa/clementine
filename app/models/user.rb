class User < ApplicationRecord
  has_many :payments
  has_many :sales
  has_many :purchased_items, through: :sales, source: "item"
  has_many :excluded_items, through: :purchased_items
  has_many :qualified_items, through: :purchased_items
  has_many :upgrade_to_items, through: :purchased_items
  has_many :upgrade_from_to, through: :purchased_items
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def purchaseable_items
  	# for now, all the items except those on the excluded list for the items the user has already purchased
  	(Item.no_qualifier_item_required + self.qualified_items) - self.excluded_items - self.upgrade_to_items
  end

  def price_paid(item)
  	# todo:  assert that there is only one sale of a given item to a user
  	self.sales.find_by(:item_id => item.id).price.amount
  end
end