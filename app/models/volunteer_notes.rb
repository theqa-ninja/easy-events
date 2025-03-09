class VolunteerNotes < ApplicationRecord
  belongs_to :user
  has_one :author, through: :user
  belongs_to :event_info, optional: true
end
