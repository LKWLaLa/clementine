class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :supply, :quantity_remaining, 
  :item_type_id, :sold_out,:current_price_info, :partnered, :expiration

  def current_price_info
    object.item_type.current_price(@instance_options[:current_user]) || "sold out"
  end

  def quantity_remaining
    object.quantity_remaining.to_i
  end

end
