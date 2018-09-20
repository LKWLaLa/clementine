class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :supply, :quantity_remaining, 
  :current_price, :current_price_type, :item_type_id, :sold_out

  def current_price
    object.current_price.to_f || "sold out"
  end

  def current_price_type
    object.item_type.current_price.try(:price_type)  || "sold out"
  end

  def quantity_remaining
    object.quantity_remaining.to_i
  end


end
