class CreateUpgrades < ActiveRecord::Migration[5.2]
  def change
    create_table :upgrades do |t|
      t.integer :upgrade_from_item_id
      t.integer :upgrade_to_item_id

      t.timestamps
    end
  end
end
