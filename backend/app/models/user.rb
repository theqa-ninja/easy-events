class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include DeviseTokenAuth::Concerns::User
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  attr_reader :current_organization, :current_team

  default_scope do
    select(column_names - %w[provider uid created_at
                             updated_at deleted_at
                             soft_deleted allow_password_change])
      .where(soft_deleted: false) # TODO: this isn't hiding everything oddly... test on /me
  end

  validates :email, uniqueness: true
  validates :is_over_18, presence: true

  possible_perms_list = %i[CREATE_ORG EDIT_ORG VIEW_ORG CREATE_TEAM EDIT_TEAM VIEW_TEAM CREATE_EVENT EDIT_EVENT VIEW_EVENT].freeze

  def event_leader?(team_id)
    organization_id = Team.find(team_id)&.organization_id
    return false if organization_id.nil?

    result = UsersTypesTeam.joins(:user_type)
                           .where(organization_id: organization_id, user_id: id,
                                  team_id: [team_id, nil], "user_type.edit_event": true)
    !result.first.nil? # returns false if no results
  end

  def check_permissions(org_id, team_id, permissions_list)
    user_perms = team_permissions
    user_perms = user_perms.select { |perm| perm[:org_id] == org_id } unless org_id.nil?
    user_perms = user_perms.select { |perm| perm[:team_id] == team_id } unless team_id.nil?
    result = false
    user_perms.each do |perm|
      if (perm[:permissions].keys & permissions_list).any?
        result = true
        break
      end
    end
    result
  end

  def permissions_json(user_type_perms)
    {
      CREATE_ORG: user_type_perms.create_org,
      EDIT_ORG: user_type_perms.edit_org,
      VIEW_ORG: user_type_perms.view_org,
      CREATE_TEAM: user_type_perms.create_team,
      EDIT_TEAM: user_type_perms.edit_team,
      VIEW_TEAM: user_type_perms.view_team,
      CREATE_EVENT: user_type_perms.create_event,
      EDIT_EVENT: user_type_perms.edit_event,
      VIEW_EVENT: user_type_perms.view_event
    }.reject { |_, value| value == false }
  end

  def team_permissions
    perms = UsersTypesTeam.where(user_id: id)
    return [] if perms.empty?

    # get all teams the user has access to
    perms.includes(:team).map do |ut|
      { organization: ut.organization.name, org_id: ut.organization_id, team: ut.team.name, team_id: ut.team_id, user_type: ut.user_type_role,
        user_role_description: ut.user_type.description,
        permissions: permissions_json(ut.user_type) }
    end
  end

  def as_json(_options = {})
    super(methods: [])
  end
end
