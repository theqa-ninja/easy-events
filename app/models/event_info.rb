class EventInfo < ApplicationRecord
  has_many :signups, dependent: :destroy
end
