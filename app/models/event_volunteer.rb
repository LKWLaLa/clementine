class EventVolunteer < ApplicationRecord
	belongs_to :user
	belongs_to :event
	alias_attribute :volunteer, :user
end