class AddExpirationColumnToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :expiration, 'timestamp with time zone'
  end
end
