class CreateOffers < ActiveRecord::Migration[5.2]
  def change
    create_table :offers do |t|
      t.integer :user_id
      t.integer :price_id
      t.boolean :overrides_price_inventory
      t.boolean :overrides_item_inventory

      t.timestamps
    end
  end
end
