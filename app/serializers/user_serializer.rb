class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :full_name,
  :email, :purchased_items

  has_many :payments

  def purchased_items
    sales = object.sales.map{|sale| {
      item: sale.item.name,
      purchase_price: sale.price.amount,
      price_type: sale.price.price_type
    }}

  end

end
