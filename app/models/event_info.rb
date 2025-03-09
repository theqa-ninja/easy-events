class EventInfo < ApplicationRecord
  has_many :signups, dependent: :destroy
  has_one :creator, through: :team
  has_one :organization, through: :team

  belongs_to :team

  # remaining_adult_slots = -> { adult_slots - Signup.where(event_id: id).where(user_is_over_18: true).count }

  # remaining_teenager_slots = -> { teenager_slots - Signup.where(event_id: id).where(user_is_over_18: false).count }

  def remaining_adult_slots
    adult_slots - Signup.where(event_id: id).where(user_is_over_18: true).count
  end

  def remaining_teenager_slots
    teenager_slots - Signup.where(event_id: id).where(user_is_over_18: false).count
  end

  # def as_json(options = {})
  #   super(options).merge(remaining_adult_slots: remaining_adult_slots).merge(remaining_teenager_slots: remaining_teenager_slots)
  # end
end
