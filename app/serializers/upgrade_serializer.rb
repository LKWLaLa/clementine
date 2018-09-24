class UpgradeSerializer < ActiveModel::Serializer
  attributes :id, :upgrade_from_item_id, :upgrade_to_item_id

  def upgrade_from_item_name
    object.upgrade_from_item.name
  end

  def upgrade_to_item_name
    object.upgrade_to_item.name
  end
end
