class QualificationSerializer < ActiveModel::Serializer
  attributes :id, :qualifier_item_id, :qualified_item_id

  def qualified_item_name
    object.qualified_item.name
  end

  def qualifier_item_name
    object.qualifier_item.name
  end
end
