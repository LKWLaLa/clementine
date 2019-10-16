ActiveAdmin.register Sale do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
actions :index,:show, :edit, :update
permit_params :void

preserve_default_filters!
filter :event
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

batch_action :transfer, form: -> {
  # {'Transfer To User' => User.pluck(:first_name,:last_name,:id).map{|data| [data[0,2].join(" "),data[2]]}}
  {'Transfer To User' => User.all.map{|u| [u.full_name, u.id]}}
} do |ids, inputs|
  to_user_id = inputs['Transfer To User']
  err = nil
  batch_action_collection.find(ids).each do |sale|
    if (sale.void)
      err = "Cannot transfer void sale"
    end
    # Check whether target user already has item
    target_user = User.find_by_id(to_user_id)
    if (!target_user.purchaseable_items.any? {|item| item.id == sale.item_id}) 
      err = "Cannot complete transfer:  target user cannot purchase item"
    end
  end

  if (!err) 
    batch_action_collection.find(ids).each do |sale|
      new_sale = sale.dup
      new_sale.user_id = to_user_id
      sale.void = true
      sale.save
      new_sale.save
      Transfer.create(from_sale: sale, to_sale: new_sale)
    end
  end
  redirect_to collection_path, alert: err || "Transfer Complete"
end

  index do
    selectable_column
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
    column :event
    actions
  end

  show do
    attributes_table do
    row :event
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
