ActiveAdmin.register Sale do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
actions :index,:show, :edit, :update
permit_params :void


preserve_default_filters!
filter :created_at, label: "Date"
filter :user, collection: -> {
  User.all.sort_by{|u| u.full_name}
}
filter :item, collection: -> {
  Item.all.sort_by{|i| i.name}
}
filter :price, collection: -> {
  Price.all.map{|p| [p.price_type,p.id]}
}, label: "Price type"
remove_filter :payment 
remove_filter :buyer
remove_filter :partnership



  index do
    column :user
    column :item
    column :price do |sale|
      number_to_currency(sale.price.amount)
    end
    column :price_type do |sale|
      sale.price.price_type
    end
    column :payment do |sale|
      link_to sale.payment.method, admin_payment_path(sale.payment)
    end
    column :date do |sale|
      link_to sale.payment.created_at.strftime('%B %-d, %Y'), admin_payment_path(sale.payment)
    end
    column :void
    actions
  end

  show do
    attributes_table do
    row :id
    row :user
    row :item
    row :price do |sale|
      number_to_currency(sale.price.amount)
    end
    row :price_type do |sale|
      sale.price.price_type
    end
    row :payment do |sale|
      link_to sale.payment.method, admin_payment_path(sale.payment)
    end
    row :date do |sale|
      sale.payment.created_at.strftime('%B %-d, %Y')
    end
    row :void
    end
    active_admin_comments
  end

  form do |f|
    f.inputs 'Edit Sale' do
       li "#{f.object.user.full_name}, #{f.object.user.email}"
       li "#{f.object.item.name}"
       li "#{f.object.price.price_type} - #{number_to_currency(f.object.price.amount)}"
       li "Payment via #{f.object.payment.method}, #{f.object.payment.created_at.strftime('%B %-d, %Y')}"
      f.input :void, as: :select, include_blank: false
    end
    f.actions
  end

  csv do
    column :id
    column :user do |sale|
      sale.user.full_name
    end
    column :item do |sale|
      sale.item.name
    end
    column :price do |sale|
      number_to_currency(sale.price.amount)
    end
    column :price_type do |sale|
      sale.price.price_type
    end
    column :payment do |sale|
      sale.payment.method
    end
    column :date do |sale|
      sale.payment.created_at.strftime('%B %-d, %Y')
    end
    column :void
  end



end
