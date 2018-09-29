ActiveAdmin.register ItemType do

actions :index, :show, :new, :create, :edit, :update
permit_params :name

index do
  column :name
  column :created_at
  actions
end 

show do
  attributes_table do
    row :name
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
