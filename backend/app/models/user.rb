# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include DeviseTokenAuth::Concerns::User
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  attr_reader :current_organization, :current_team

  # TODO: add before_save logic if admin, create entry for each team in the organization

  def leader?(team_id)
    # TODO: include admins / superadmins
    organization_id = Teams.find(team_id)&.organization_id
    return false if result.nil?

    # check first if they are superadmin

    # check first if they are admin
    result = UsersTypesTeam.where(organization_id: organization_id).find_by(user_id: id)
    return false if result.nil?

    # check if they have access
    team_id.include?(result&.team_id)
  end

  def admin?(organization_id)
    result = UsersTypesTeam.find_by(user_id: id, organization_id: organization_id)
    return false if result.nil?

    %w[Admin Superadmin].include?(result.user_type_role)
  end

  def superadmin?
    result = UsersTypesTeam.find_by(user_id: id)
    return false if result.nil?

    'Superadmin'.include?(result&.user_type_role)
  end

  def team_permissions
    UsersTypesTeam.where(user_id: id).includes(:team).map { |ut| { team: ut.team, user_type: ut.user_type_role } }
  end

  def as_json(_options = {})
    super(methods: [:team_permissions])
  end
end
