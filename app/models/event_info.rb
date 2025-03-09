class EventInfo < ApplicationRecord
  has_many :signups, dependent: :destroy
  has_one :creator, through: :team
  has_one :organization, through: :team

  belongs_to :team

  def adult_slots_remaining
    adult_slots - Signup.where(event_id: id).where(user_is_over_18: true).count
  end

  def teenager_slots_remaining
    teenager_slots - Signup.where(event_id: id).where(user_is_over_18: false).count
  end
end
