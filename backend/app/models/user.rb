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

  def leader?(team_id)
    organization_id = UsersTypesTeam.find(team_id)&.organization_id
    return false if organization_id.nil?

    # check first if they are superadmin

    result = UsersTypesTeam.where(organization_id: organization_id, user_id: id, team_id: [team_id, nil])
    return false if result.nil?

    # check first if they are admin

    # check if they have access
    ['Admin', 'Team Lead'].include?(result.first&.user_type_role) # TODO: convert these to actual role_ids
  end

  # Check if the user is an admin for the given organization
  # if no organization_id, just a generic check
  def admin?(organization_id = nil)
    result = UsersTypesTeam.where(user_id: id)
    result = result.where(organization_id: organization_id) unless organization_id.nil?
    return false if result.first.nil?

    %w[Admin Superadmin].include?(result.first&.user_type_role) # TODO: convert these to actual role_ids
  end

  def superadmin?
    result = UsersTypesTeam.where(user_id: id)
    return false if result.first.nil?

    'Superadmin'.include?(result.first&.user_type_role) # TODO: convert these to actual role_ids
  end

  def team_permissions
    perms = UsersTypesTeam.where(user_id: id)
    return [] if perms.empty?

    perms.includes(:team).map { |ut| { team: ut.team, user_type: ut.user_type_role } }
  end

  def as_json(_options = {})
    super(methods: [:team_permissions])
  end
end
