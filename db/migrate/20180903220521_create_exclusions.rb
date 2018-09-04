class CreateExclusions < ActiveRecord::Migration[5.2]
  def change
    create_table :exclusions do |t|
      t.integer :excluder_item_id
      t.integer :excluded_item_id

      t.timestamps
    end
  end
end
