class Signup < ApplicationRecord
  has_one :event_info
  has_one :user
  has_one :volunteer_note

  # Every saved signup must have name, email address, and whether the user is over 18
  validates :user_name, :user_email, :user_is_over_18, presence: true
  validates :user_email, uniqueness: true

  # when submitting a form, preserves scroll position with turbo broadcasts
  # goes with turbo_stream_from signup
  broadcasts_refreshes
end
