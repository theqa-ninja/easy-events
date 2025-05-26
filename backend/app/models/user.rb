class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include DeviseTokenAuth::Concerns::User
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  attr_reader :current_organization, :current_team

  def is_leader
    result = UsersTypesTeam.find_by(user_id: id)
    return false if result.nil?

    @current_organization = Organization.find_by(id: result.organization_id)
    @current_team = Team.find_by(id: result.team_id)
    self && UsersTypesTeam.find_by(user_id: id)
  end

  def is_admin
    result = UsersTypesTeam.find_by(user_id: id)
    return false if result.nil?

    @current_organization = Organization.find_by(id: result.organization_id)
    @current_team = Team.find_by(id: result.team_id)
    result&.user_type == 'admin'
  end
end
