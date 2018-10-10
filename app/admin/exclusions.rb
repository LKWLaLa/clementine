ActiveAdmin.register Exclusion do
  actions :index, :show, :new, :create, :destroy
  permit_params :excluder_item_id, :excluded_item_id

  preserve_default_filters!
  remove_filter :created_at
  remove_filter :updated_at

  index do 
    column :excluder_item
    column :excluded_item
    actions
  end

  csv do
    column :excluder_item do |exclusion|
      exclusion.excluder_item.name
    end
    column :excluded_item do |exclusion|
      exclusion.excluded_item.name
    end
  end

end
