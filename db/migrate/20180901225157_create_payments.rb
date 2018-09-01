class CreatePayments < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.integer :user_id
      t.decimal :amount, precision: 10, scale: 2
      t.timestamps
    end
  end
end
