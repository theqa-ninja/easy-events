class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include DeviseTokenAuth::Concerns::User
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  attr_reader :current_organization, :current_team

  # TODO: add before_save logic if admin, create entry for each team in the organization

  def leader?
    result = UsersTypesTeam.find_by(user_id: id)
    return false if result.nil?

    @current_organization = Organization.find_by(id: result.organization_id)
    @current_team = Team.find_by(id: result.team_id)
    self && UsersTypesTeam.find_by(user_id: id)
  end

  def admin?
    result = UsersTypesTeam.find_by(user_id: id)
    return false if result.nil?

    @current_organization = Organization.find_by(id: result.organization_id)
    @current_team = Team.find_by(id: result.team_id)
    result&.user_type == 'admin'
  end

  def team_permissions
    UsersTypesTeam.where(user_id: id).includes(:team, :user_type).map { |ut| { team: ut.team, user_type: ut.user_type } }
  end

  def as_json(options = {})
    super(methods: [:team_permissions])
  end
end
