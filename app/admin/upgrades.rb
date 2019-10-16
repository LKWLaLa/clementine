ActiveAdmin.register Upgrade do
actions :index, :show, :new, :create, :destroy
  permit_params :upgrade_from_item_id, :upgrade_to_item_id

  preserve_default_filters!
  filter :event
  remove_filter :created_at
  remove_filter :updated_at

  index do 
    column :upgrade_from_item
    column :upgrade_to_item
    column :event
    actions
  end

  csv do
    column :upgrade_from_item do |upgrade|
      upgrade.upgrade_from_item.name
    end
    column :upgrade_to_item do |upgrade|
      upgrade.upgrade_to_item.name
    end
  end

end
