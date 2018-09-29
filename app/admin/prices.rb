ActiveAdmin.register Price do
actions :index

filter :price_type, as: :select
filter :item_type, as: :select
filter :items
filter :supply
filter :priority
filter :amount


index do
  column :price_type
  column :amount do |price|
    number_to_currency(price.amount)
  end
  column :priority
  column :item_type
  column :supply
  actions
end

end
