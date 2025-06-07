class Signup < ApplicationRecord
  has_one :user, dependent: :nullify
  has_one :volunteer_note, dependent: :nullify

  # Every saved signup must have name, email address, and whether the user is over 18
  validates :user_name, :user_email, presence: true
  validates :user_is_over_18, inclusion: { in: [true, false] }
  validates :user_email, uniqueness: { scope: %i[user_name event_id] }, format: { with: URI::MailTo::EMAIL_REGEXP }

  # when submitting a form, preserves scroll position with turbo broadcasts
  # goes with turbo_stream_from signup
end
