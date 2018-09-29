ActiveAdmin.register Qualification do
actions :index, :show, :new, :create, :destroy
  permit_params :qualifier_item_id, :qualified_item_id

  preserve_default_filters!
  remove_filter :created_at
  remove_filter :updated_at

  index do
    column :qualifier_item
    column :qualified_item
    actions
  end

end
