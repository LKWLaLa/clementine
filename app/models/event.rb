class Event < ApplicationRecord
	has_many :item_types
	has_many :prices, through: :item_types
	has_many :items, through: :item_types
	has_many :exclusions, through: :items, source: :excluder_excludeds
	has_many :qualifications, through: :items, source: :qualifier_qualifieds
	has_many :upgrades, through: :items, source: :upgrade_from_to
	has_many :sales, through: :items, source: :sales
	has_many :users, through: :sales
	has_many :partnerships, through: :sales
	has_many :offers, through: :prices
	has_many :event_volunteers
	has_many :volunteers, through: :event_volunteers
end
