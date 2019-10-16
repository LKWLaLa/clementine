class CreateEventVolunteers < ActiveRecord::Migration[5.2]
  def change
    create_table :event_volunteers do |t|
    	t.integer :user_id
    	t.integer :event_id
    end
  end
end
