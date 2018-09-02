ActiveAdmin.register User do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
permit_params :first_name, :last_name, :email

  index do |user|
    column :first_name
    column :last_name
    column :email
    column :city
    column :country
  end


end
