ActiveAdmin.register User do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
actions :index, :show, :edit, :update
permit_params :first_name, :last_name, :email

  index do |user|
    column :id
    column :first_name
    column :last_name
    column :email
    column :city
    column :country
    actions
  end


  show do
    attributes_table do
     row :id
     row :first_name
     row :last_name
     row :email
     row :city
     row :country
      panel "Payments" do
        table_for user.payments do
          column "amount" do |payment|
            payment.amount
          end
          column "method" do |payment|
            payment.method
          end
          column "date" do |payment|
            payment.created_at
          end
        end
      end
    end
  end


end
