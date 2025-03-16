class Signup < ApplicationRecord
  has_one :event_info
  has_one :user

  # when submitting a form, preserves scroll position with turbo broadcasts
  # goes with turbo_stream_from signup
  broadcasts_refreshes 
  
end
