class VolunteerNote < ApplicationRecord
  belongs_to :user, optional: true
  has_one :author, through: :user
  belongs_to :event_info, optional: true
  belongs_to :signup, optional: true
end
