class CreatePartnerships < ActiveRecord::Migration[5.2]
  def change
    create_table :partnerships do |t|
      t.references :sale, foreign_key: true
      t.integer :invitee_id

      t.timestamps
    end
  end
end
