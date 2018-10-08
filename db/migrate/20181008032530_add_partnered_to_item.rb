class AddPartneredToItem < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :partnered, :boolean, default: false
  end
end
