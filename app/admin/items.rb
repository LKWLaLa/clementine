ActiveAdmin.register Item do

  actions :index, :show, :new, :create, :edit, :update
  permit_params :name, :description, :item_type_id, :supply

  filter :item_type, as: :select
  filter :supply
  filter :created_at
  filter :updated_at

  index do
    column :name
    column :item_type
    column :description
    column :current_price do |item|
      number_to_currency(item.current_price)
    end
    column :current_price_type do |item|
      cp = item.item_type.current_price
      cp ? cp.price_type : nil
    end
    column :quantity_remaining
    column :sold_out
    actions
  end

  show do
  attributes_table do
    row :name
    row :item_type
    row :description
    row :current_price do |item|
      number_to_currency(item.current_price)
    end
    row :current_price_type do |item|
      item.item_type.current_price.price_type
    end
    row :supply
    row :quantity_remaining
    end
     panel "Price Types" do
      table_for item.prices do
        column "price type" do |price|
          price.price_type
        end
         column "priority" do |price|
          price.priority
        end
        column "amount" do |price|
          number_to_currency(price.amount)
        end
        column "supply" do |price|
          price.supply
        end
        column "quantity remaining" do |price|
          price.quantity_remaining
        end
      end
    end
  end

end
