class RemoveInventoryFromItem < ActiveRecord::Migration[5.2]
  def change
    remove_column :items, :inventory, :integer
  end
end
