ActiveAdmin.register Exclusion do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

actions :index, :show, :new, :destroy
permit_params :excluder_item_id, :excluded_item_id

preserve_default_filters!
remove_filter :created_at
remove_filter :updated_at

index do |user|
    column :excluder_item
    column :excluded_item
    actions
  end

end
