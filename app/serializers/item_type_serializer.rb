class ItemTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :current_price, :current_price_type, 
  :quantity_remaining_at_current_price, :sold_out, :next_price_type, :description, :private_price

  #has_many :items

  def current_price
    # object.current_price.try(:amount).try(:to_f) || "sold out"
    p = object.lowest_price_for_user(@instance_options[:current_user])
    p.try(:amount).try(:to_f) || "sold out"
  end

  def current_price_type
    # object.current_price.try(:price_type) || "sold out"
    p = object.lowest_price_for_user(@instance_options[:current_user])
    p.try(:price_type) || "sold out"
  end

  def quantity_remaining_at_current_price
    p = object.lowest_price_for_user(@instance_options[:current_user])
    if (p && !p.private) 
      return p.quantity_remaining
    else
      return 0
    end
  end

  def next_price_type
    p = object.lowest_price_for_user(@instance_options[:current_user])
    if (!p.private)
      return object.next_price.try(:price_type)
    else
      return nil
    end
  end

  def private_price
    p = object.lowest_price_for_user(@instance_options[:current_user])
    return p.private
  end
end
