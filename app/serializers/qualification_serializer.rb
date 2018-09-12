class QualificationSerializer < ActiveModel::Serializer
  attributes :qualifier_item_id, :qualifier_item_name,
  :qualified_item_id, :qualified_item_name

  def qualified_item_name
    object.qualified_item.name
  end

  def qualifier_item_name
    object.qualifier_item.name
  end
end
