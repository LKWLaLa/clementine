ActiveAdmin.register Offer do
  actions :index, :show, :new, :create, :destroy
  permit_params :user_id, :price_id, :overrides_item_inventory, :overrides_price_inventory

  preserve_default_filters!
  filter :event
  remove_filter :created_at
  remove_filter :updated_at

  index do 
    column :user
    column :price
    column :event
    actions
  end

end