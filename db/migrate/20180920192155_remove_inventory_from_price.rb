class RemoveInventoryFromPrice < ActiveRecord::Migration[5.2]
  def change
    remove_column :prices, :inventory, :integer
  end
end
