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
            div "#{Event.find_by(active: true).sales.count} total sales"
            div "#{number_to_currency(Event.find_by(active: true).sales.where(void: false).reduce(0) {|a, s| a + s.price.amount})} in revenue"              
        end
      end

    end


  end # content
end
