class CreateSales < ActiveRecord::Migration[5.2]
  def change
    create_table :sales do |t|
      t.integer :user_id
      t.integer :price_id
      t.integer :item_id
      t.integer :payment_id

      t.timestamps
    end
  end
end
