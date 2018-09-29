ActiveAdmin.register Upgrade do
actions :index, :show, :new, :create, :destroy
  permit_params :upgrade_from_item_id, :upgrade_to_item_id

  preserve_default_filters!
  remove_filter :created_at
  remove_filter :updated_at

  index do 
    column :upgrade_from_item
    column :upgrade_to_item
    actions
  end

end
