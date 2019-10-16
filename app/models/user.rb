class User < ApplicationRecord
  has_many :payments
  has_many :sales
  has_many :offers
  has_many :offered_prices, through: :offers, source: "price"
  has_many :purchased_items, -> { where 'void = FALSE'}, through: :sales, source: "item"
  has_many :excluded_items, through: :purchased_items
  has_many :qualified_items, through: :purchased_items
  has_many :upgrade_to_items, through: :purchased_items
  has_many :upgrade_from_to, through: :purchased_items
  has_many :event_volunteers

  # Partnerships where this user bought the partnered item
  has_many :buyer_partnerships, through: :sales, source: "partnership"
  # Partnerships where another user bought the partnered item and listed
  # this user as her partner
  has_many :invitee_partnerships, class_name: :Partnership, foreign_key: "invitee_id"
  # Include default devise modules. Others available are:
  # :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable, :timeoutable, :lockable

  validates_presence_of :first_name, :last_name

  scope :at_least_one_sale, -> { joins(:sales).group(:id) }
  scope :no_sales, -> { includes(:sales).where(sales: {:id => nil}) }
  
  def purchaseable_items
  	# for now, all the items except those on the excluded list for the items the user has already purchased
  	(Item.no_qualifier_item_required + self.qualified_items) - self.excluded_items - self.upgrade_to_items
  end

  def price_paid(item)
  	# todo:  assert that there is only one sale of a given item to a user
  	sale = self.sales.find_by(:item_id => item.id)
  	if (sale)
  		return sale.price.amount 
  	else
  		return nil
  	end
  end

  def full_name
    first_name + ' ' + last_name
  end

  def lowest_price_for_item_type(item_type) 
    lowest_offered_price = self.offered_prices.where(item_type: item_type).min_by(&:amount)
    public_price = item_type.current_public_price
    all = [lowest_offered_price,public_price].select{|price| !price.nil?}
    all.min_by(&:amount)
  end

  def volunteer
    current_event = Event.find_by(active: true)
    !EventVolunteer.where(user_id: self.id, event_id: current_event.id).empty?
  end

end