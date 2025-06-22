# backend/app/models/event.rb
class Event < ApplicationRecord
  has_many :signups, dependent: :destroy
  has_one :creator, through: :team
  has_one :organization, through: :team

  belongs_to :team

  def remaining_adult_slots
    adult_slots - signups.where(is_over_18: true).where.not(cancelled_at: nil).length
  end

  def remaining_teenager_slots
    teenager_slots - signups.where(is_over_18: false).where.not(cancelled_at: nil).length
  end

  def volunteer_role_counts
    # query the sign ups
    roles = VolunteerRole.where(team_id: team_id)
    # return a hash of role => count
    roles.map do |role|
      { "role": role.role, "role_id": role.id, "count": signups.where(volunteer_role_id: role.id).count }
    end.to_ary
  end

  def checkins
    signups.where.not(checked_in_at: nil)
  end

  def as_json(_options = {})
    super(methods: %i[remaining_adult_slots remaining_teenager_slots])
  end
end
