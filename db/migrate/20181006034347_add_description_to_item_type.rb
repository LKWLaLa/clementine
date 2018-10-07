class AddDescriptionToItemType < ActiveRecord::Migration[5.2]
  def change
    add_column :item_types, :description, :string
  end
end
