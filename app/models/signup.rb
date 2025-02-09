class Signup < ApplicationRecord
  has_one :event_info
  has_one :user
end
