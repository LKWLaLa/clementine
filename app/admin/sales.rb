ActiveAdmin.register Sale do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :user_id, :item_id, :price_id, :payment_id

  index do |user|
    column :user_id
    column :item_id
    column :price_id
    column :payment_id
  end

end
