class ExclusionSerializer < ActiveModel::Serializer
  attributes :excluder_item_id, :excluder_item_name, 
  :excluded_item_id, :excluded_item_name

  def excluder_item_name
    object.excluder_item.name
  end

  def excluded_item_name
    object.excluded_item.name
  end
end
