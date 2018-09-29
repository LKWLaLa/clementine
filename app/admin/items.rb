ActiveAdmin.register Item do

  actions :index, :show, :new, :create, :edit, :update
  permit_params :name, :description, :item_type_id, :supply

  filter :item_type, as: :select
  filter :supply
  filter :created_at
  filter :updated_at

  show do
  attributes_table do
    row :name
    row :item_type
    row :description
    row :supply
    end
     panel "Price Types" do
      table_for item.prices do
        column "price type" do |price|
          link_to price.price_type, admin_price_path(price)
        end
        column "amount" do |price|
          number_to_currency(price.amount)
        end
        column "supply" do |price|
          price.supply
        end
      end
    end
  end

end
