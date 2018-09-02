class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.integer :item_type_id
      t.string :description
      t.integer :inventory
      t.integer :supply

      t.timestamps
    end
  end
end
