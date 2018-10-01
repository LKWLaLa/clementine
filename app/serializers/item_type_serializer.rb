class ItemTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :current_price, :current_price_type, 
  :quantity_remaining_at_current_price, :sold_out, :next_price_type

  #has_many :items

  def current_price
    object.current_price.try(:amount).try(:to_f) || "sold out"
  end

  def current_price_type
    object.current_price.try(:price_type) || "sold out"
  end

  def quantity_remaining_at_current_price
    p = object.current_price
    if (p) 
      return p.quantity_remaining
    else
      return 0
    end
  end

  def next_price_type
    object.next_price.try(:price_type)
  end

end
