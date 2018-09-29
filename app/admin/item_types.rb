ActiveAdmin.register ItemType do

actions :index, :show, :new, :create, :edit, :update
permit_params :name

index do
  column :name
  column :current_price do |it|
    number_to_currency(it.current_price.amount)
  end
  column :sold_out
  actions
end 

show do
  attributes_table do
    row :name
    row :current_price do |it|
      number_to_currency(it.current_price.amount)
    end
    row :sold_out
    row :created_at
    end
     panel "Items included" do
      table_for item_type.items do
        column "item" do |item|
          link_to item.name, admin_item_path(item)
        end
        column "description" do |item|
          item.description
        end
      end
    end
  end

end
