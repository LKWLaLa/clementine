class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :full_name,
  :email, :purchased_items

  has_many :payments

  def purchased_items
    sales = object.sales
      .select{|sale| !sale.void}
      .map{|sale| {
      id: sale.item.id,
      item: sale.item.name,
      purchase_price: sale.price.amount.to_f,
      price_type: sale.price.price_type,
      sale_id: sale.id
    }}

  end

end
