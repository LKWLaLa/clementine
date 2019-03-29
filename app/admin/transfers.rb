ActiveAdmin.register Transfer do
  actions :index, :show

  preserve_default_filters!
  remove_filter :created_at
  remove_filter :updated_at

  index do 
    column :from_user
    column :to_user
    column :item
    column :from_sale
    column :to_sale
    actions
  end

  show do
    attributes_table do
      row :from_user
      row :to_user
      row :item
      row :created_at
      row :from_sale
      row :to_sale
    end
  end
end