class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :supply, :quantity_remaining, 
  :item_type_id, :sold_out,:current_price,:current_price_info, :partnered

  def current_price
    object.current_price.to_f || "sold out"
  end

  def current_price_info
    object.item_type.current_price || "sold out"
  end

  def quantity_remaining
    object.quantity_remaining.to_i
  end


end
