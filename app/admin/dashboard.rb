ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    
    columns do

      column do
        panel "Bal Week Admin Dashboard" do
            div "Welcome! :)"
        end
      end
        
      column do
        panel "Stats to date" do
            div "#{Sale.where(void: false).count} total sales"
            div "#{number_to_currency(Sale.where(void: false).reduce(0) {|a, s| a + s.price.amount})} in revenue"              
        end
      end

    end


  end # content
end
