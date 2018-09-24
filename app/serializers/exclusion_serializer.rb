class ExclusionSerializer < ActiveModel::Serializer
  attributes :id, :excluder_item_id, :excluded_item_id

  def excluder_item_name
    object.excluder_item.name
  end

  def excluded_item_name
    object.excluded_item.name
  end
end
