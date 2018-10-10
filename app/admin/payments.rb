ActiveAdmin.register Payment do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#

actions :index,:show

preserve_default_filters!
filter :created_at, label: "Date"
filter :user, collection: -> {
  User.all.sort_by{|u| u.full_name}
}
filter :method, as: :select
remove_filter :updated_at
remove_filter :sales


  index do
    column :user
    column :amount do |payment|
      number_to_currency(payment.amount)
    end
    column :method 
    column :date do |payment|
      payment.created_at.strftime('%B %-d, %Y')
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :user
      row :amount do |payment|
        number_to_currency(payment.amount)
      end
      row :method 
      row :date do |payment|
        payment.created_at.strftime('%B %-d, %Y')
      end
       panel "Items included" do
        table_for payment.sales do
          column "item" do |sale|
            sale.item.name
          end
          column "description" do |sale|
            sale.item.description
          end
          column "price_type" do |sale|
            sale.price.price_type
          end
          column "amount" do |sale|
            number_to_currency(sale.price.amount)
          end
        end
      end
      active_admin_comments
    end
  end

  csv do
    column :user do |payment|
      payment.user.full_name
    end
    column :amount do |payment|
      number_to_currency(payment.amount)
    end
    column :method 
    column :date do |payment|
      payment.created_at.strftime('%B %-d, %Y')
    end
  end

end

