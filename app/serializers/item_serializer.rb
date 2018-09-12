class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :item_type_name, :inventory, :current_price

  def current_price
    price = object.item_type.current_price
    if (price)
      return price.amount
    end
    return nil
  end

  def item_type_name
    object.item_type.name
  end

end
