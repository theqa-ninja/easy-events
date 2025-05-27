# backend/app/models/event.rb
class Event < ApplicationRecord
  has_many :signups, dependent: :destroy
  has_one :creator, through: :team
  has_one :organization, through: :team

  belongs_to :team

  # remaining_adult_slots = -> { adult_slots - Signup.where(event_id: id).where(user_is_over_18: true).count }

  # remaining_teenager_slots = -> { teenager_slots - Signup.where(event_id: id).where(user_is_over_18: false).count }

  def remaining_adult_slots
    adult_slots - Signup.where(event_id: id).where(soft_deleted: false).where(user_is_over_18: true).length
  end

  def remaining_teenager_slots
    teenager_slots - Signup.where(event_id: id).where(soft_deleted: false).where(user_is_over_18: false).length
  end

  def volunteer_role_counts
    # get all the unique volunteer roles for this event
    signups = Signup.where(event_id: id)
    # query the sign ups
    roles = VolunteerRole.where(team_id: team_id)
    # return a hash of role => count
    roles.map do |role|
      { "role": role.role, "role_id": role.id, "count": signups.where(volunteer_role_id: role.id).count }
    end.to_ary
  end

  def as_json(_options = {})
    super(methods: %i[remaining_adult_slots remaining_teenager_slots])
  end
end
