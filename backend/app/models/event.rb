# backend/app/models/event.rb
class Event < ApplicationRecord
  has_many :signups, dependent: :destroy
  has_one :creator, through: :team
  has_one :organization, through: :team

  belongs_to :team

  delegate :name, to: :team, prefix: true

  def possible_volunteer_roles
    result = {}
    volunteer_roles.each do |v_role|
      role_id = v_role['role_id']
      role = VolunteerRole.find(role_id)
      result[role.role] = { "count": v_role['count'], "role": role.role, "role_id": role.id, "description": role.description }
    end
    result
  end

  def remaining_adult_slots
    adult_slots - signups.where(is_over_18: true).where(cancelled_at: nil).length
  end

  def remaining_teenager_slots
    teenager_slots - signups.where(is_over_18: false).where(cancelled_at: nil).length
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

  def org_id
    team.organization_id
  end

  def org_name
    team.organization.name
  end

  def as_json(_options = {})
    super(methods: %i[org_id org_name remaining_adult_slots remaining_teenager_slots team_name possible_volunteer_roles])
  end
end
