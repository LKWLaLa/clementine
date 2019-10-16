ActiveAdmin.register Item do

  actions :index, :show, :new, :create, :edit, :update
  permit_params :name, :description, :item_type_id, :supply, :expiration, :partnered

  filter :event
  filter :item_type, as: :select
  filter :supply
  filter :partnered
  filter :created_at
  filter :updated_at

  index do
    column :name
    column :item_type
    column :description
    column :partnered
    column :current_price do |item|
      number_to_currency(item.current_public_price_amount)
    end
    column :current_price_type do |item|
      cp = item.item_type.current_public_price
      cp ? cp.price_type : nil
    end
    column :quantity_remaining
    column :sold_out
    column :event
    actions
  end

  show do
  attributes_table do
    row :event
    row :name
    row :item_type
    row :description
    row :partnered
    row :expiration do |item|
      item.expiration.to_s
    end
    row :current_price do |item|
      number_to_currency(item.current_public_price_amount)
    end
    row :current_price_type do |item|
      item.item_type.current_public_price.price_type
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

  csv do
    column :name
    column :item_type do |item|
      item.item_type.name
    end
    column :description
    column :partnered
    column :current_price do |item|
      number_to_currency(item.current_price)
    end
    column :current_price_type do |item|
      cp = item.item_type.current_price
      cp ? cp.price_type : nil
    end
    column :quantity_remaining
    column :sold_out
  end

end
