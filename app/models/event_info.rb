class EventInfo < ApplicationRecord
  has_many :signups, dependent: :destroy
  has_one :creator, through: :team
  has_one :organization, through: :team

  belongs_to :team

  # remaining_adult_slots = -> { adult_slots - Signup.where(event_info_id: id).where(user_is_over_18: true).count }

  # remaining_teenager_slots = -> { teenager_slots - Signup.where(event_info_id: id).where(user_is_over_18: false).count }

  def remaining_adult_slots
    remaining = adult_slots - Signup.where(event_info_id: id).where(user_is_over_18: true).count
    return remaining if remaining > 0
    "full"
  end

  def remaining_teenager_slots
    remaining = teenager_slots - Signup.where(event_info_id: id).where(user_is_over_18: false).count
    return remaining if remaining > 0
    "full"
  end

  def volunteer_role_counts
    # get all the unique volunteer roles for this event
    signups = Signup.where(event_info_id: id)
    # query the sign ups
    roles = VolunteerRole.where(team_id: team_id)
    # return a hash of role => count
    roles.map do |role|
      {"role": role.role, "role_id": role.id, "count": signups.where(volunteer_role_id: role.id).count}
    end.to_ary
  end

  # def as_json(options = {})
  #   super(options).merge(remaining_adult_slots: remaining_adult_slots).merge(remaining_teenager_slots: remaining_teenager_slots)
  # end
end
