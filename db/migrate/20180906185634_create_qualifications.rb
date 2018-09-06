class CreateQualifications < ActiveRecord::Migration[5.2]
  def change
    create_table :qualifications do |t|
      t.integer :qualifier_item_id
      t.integer :qualified_item_id

      t.timestamps
    end
  end
end
