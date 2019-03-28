class AddPrivateToPrices < ActiveRecord::Migration[5.2]
  def change
    add_column :prices, :private, :boolean
  end
end
