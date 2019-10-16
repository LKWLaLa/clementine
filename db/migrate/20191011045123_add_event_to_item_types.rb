class AddEventToItemTypes < ActiveRecord::Migration[5.2]
  def change
  	add_reference :item_types, :event, foreign_key: true
  end
end
