ActiveAdmin.register Partnership do

  actions :index, :show, :edit, :update  
  permit_params :invitee_id

  filter :event
  filter :item
  filter :buyer
  filter :invitee
  filter :created_at
  filter :updated_at
  

  index do
    column :item
    column :buyer
    column :invitee
    column :updated_at  
    column :event
    actions
  end

  show do
    attributes_table do
      row :item
      row :buyer
      row :invitee
      row :created_at
      row :updated_at
      row :event
    end
  end

  form do |f|
    f.inputs 'Edit Partnership' do
      li "Item: #{f.object.item.name}"
      li "Buyer: #{f.object.buyer.full_name}"
      f.input :invitee, as: :select
    end
    f.actions
  end

  csv do
    column :item do |partnership|
      partnership.item.name
    end
    column :buyer do |partnership|
      partnership.buyer.full_name
    end
    column :invitee do |partnership|
      partnership.invitee ? partnership.invitee.full_name : "TBD"
    end
    column :updated_at do |partnership|
      partnership.updated_at.strftime('%B %-d, %Y')
    end
  end

end
