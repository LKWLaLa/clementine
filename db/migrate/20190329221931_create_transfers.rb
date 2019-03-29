class CreateTransfers < ActiveRecord::Migration[5.2]
  def change
    create_table :transfers do |t|
      t.integer :from_sale_id
      t.integer :to_sale_id
    end
  end
end
