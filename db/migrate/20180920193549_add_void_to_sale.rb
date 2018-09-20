class AddVoidToSale < ActiveRecord::Migration[5.2]
  def change
    add_column :sales, :void, :boolean, default: false
  end
end
