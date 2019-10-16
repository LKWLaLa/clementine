ActiveAdmin.register Price do
actions :index, :new, :create, :edit, :update, :show
permit_params :price_type, :item_type_id, :supply, :priority, :amount, :private

filter :event
filter :price_type, as: :select
filter :item_type, as: :select
filter :items
filter :supply
filter :priority
filter :amount
filter :quantity_remaining



index do
  column :price_type
  column :amount do |price|
    number_to_currency(price.amount)
  end
  column :priority
  column :item_type
  column :supply
  column :quantity_remaining
  column :sold_out
  column :event
  actions
end

csv do
  column :price_type
  column :amount do |price|
    number_to_currency(price.amount)
  end
  column :priority
  column :item_type do |price|
    price.item_type.name
  end
  column :supply
  column :quantity_remaining
  column :sold_out
end

end
