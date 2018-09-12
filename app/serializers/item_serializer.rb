class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :supply, :quantity_remaining, 
  :current_price, :current_price_type, :item_type

  def current_price
    object.current_price || "sold out"
  end

  def current_price_type
    object.item_type.current_price.price_type 
  end

  def item_type
    {id: object.item_type_id, name: object.item_type.name, 
      remaining_supply_at_current_price: object.item_type.current_price.quantity_remaining}

  end

  def quantity_remaining
    object.quantity_remaining
  end


end
