class Signup < ApplicationRecord
  has_one :user, dependent: :nullify
  has_one :volunteer_note, dependent: :nullify

  # Every saved signup must have name, email address, and whether the user is over 18
  validates :name, :email, presence: true
  validates :is_over_18, inclusion: { in: [true, false] }
  # validates :email, uniqueness: { scope: %i[name event_id] }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :email, uniqueness: { scope: %i[event_id name is_over_18 soft_deleted], message: 'has already signed up for this event' }

  # when submitting a form, preserves scroll position with turbo broadcasts
  # goes with turbo_stream_from signup
end
