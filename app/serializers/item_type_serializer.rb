class ItemTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :current_price, :current_price_type, 
  :quantity_remaining_at_current_price, :sold_out, :next_price_type, :description, :private_price

  def current_price
    object.current_price_amount(@instance_options[:current_user])
  end

  def current_price_type
    object.current_price_type(@instance_options[:current_user])
  end

  def quantity_remaining_at_current_price
    object.quantity_remaining_at_current_price(@instance_options[:current_user])
  end

  def next_price_type
    object.next_price_type(@instance_options[:current_user])
  end

  def private_price
    object.private_price(@instance_options[:current_user])
  end
end
