class CreatePrices < ActiveRecord::Migration[5.2]
  def change
    create_table :prices do |t|
      t.string :price_type
      t.decimal :amount, precision: 10, scale: 2
      t.integer :priority
      t.integer :item_type_id
      t.integer :inventory
      t.integer :supply

      t.timestamps
    end
  end
end
