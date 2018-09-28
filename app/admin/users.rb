ActiveAdmin.register User do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
actions :index, :show, :edit, :update
permit_params :first_name, :last_name, :email, :city, :state, :country

preserve_default_filters!
  filter :purchased_items, as: :select, label: "Registration item"
  filter :country, as: :select
  filter :city, as: :select
  filter :state, as: :select
  remove_filter :address_line_1
  remove_filter :address_line_2
  remove_filter :postal_code
  remove_filter :updated_at
  remove_filter :payments
  remove_filter :sales
  remove_filter :locked_at
  remove_filter :unlock_token
  remove_filter :failed_attempts
  remove_filter :confirmation_sent_at
  remove_filter :confirmed_at
  remove_filter :confirmation_token
  remove_filter :encrypted_password
  remove_filter :reset_password_token
  remove_filter :reset_password_sent_at
  remove_filter :remember_created_at
  

  index do |user|
    column :id
    column :first_name
    column :last_name
    column :email
    column :city
    column :state
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
     row :state
     row :country
      panel "Payments" do
        table_for user.payments do
          column "amount" do |payment|
            number_to_currency(payment.amount)
          end
          column "method" do |payment|
            payment.method
          end
          column "date" do |payment|
            payment.created_at
          end
        end
      end
      panel "Registered Items" do
        table_for user.sales do
          column "item" do |sale|
            sale.item.name
          end
          column "description" do |sale|
            sale.item.description
          end
          column "price_type" do |sale|
            sale.price.price_type
          end
          column "amount" do |sale|
            number_to_currency(sale.price.amount)
          end
        end
      end
    end
    active_admin_comments
  end

  form do |f|
    f.inputs 'Edit User Data' do
      f.input :first_name
      f.input :last_name
      f.input :email
      f.input :city
      f.input :state, as: :select, collection: us_states, value: user.state
      f.input :country, priority: ['US', 'CA']
    end
    f.actions
  end


end
