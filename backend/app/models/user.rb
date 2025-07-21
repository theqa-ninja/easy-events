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

  permission_list = %i[CREATE_ORG EDIT_ORG VIEW_ORG CREATE_TEAM EDIT_TEAM VIEW_TEAM CREATE_EVENT EDIT_EVENT VIEW_EVENT].freeze

  def leader?(team_id)
    organization_id = UsersTypesTeam.find(team_id)&.organization_id
    return false if organization_id.nil?

    result = UsersTypesTeam.joins(:user_type)
                           .where(organization_id: organization_id, user_id: id,
                                  team_id: [team_id, nil], "user_type.edit_team": true)
    !result.first.nil? # returns false if no results
  end

  # Check if the user is an admin for the given organization
  # if no organization_id, just a generic check
  def admin?(organization_id = nil)
    result = UsersTypesTeam.joins(:user_type).where(user_id: id, "user_type.edit_org": true)
    result = result.where(organization_id: organization_id) unless organization_id.nil?
    !result.first.nil? # returns false if no results
  end

  def superadmin?
    result = UsersTypesTeam.where(user_id: id, create_org: true)
    !result.first.nil? # returns false if no results
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
