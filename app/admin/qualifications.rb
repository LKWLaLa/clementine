ActiveAdmin.register Qualification do
actions :index, :show, :new, :create, :destroy
  permit_params :qualifier_item_id, :qualified_item_id

  preserve_default_filters!
  filter :event
  remove_filter :created_at
  remove_filter :updated_at

  index do
    column :qualifier_item
    column :qualified_item
    column :event
    actions
  end

  csv do
    column :qualifier_item do |qual|
      qual.qualifier_item.name
    end
    column :qualified_item do |qual|
      qual.qualified_item.name
    end
  end

end
