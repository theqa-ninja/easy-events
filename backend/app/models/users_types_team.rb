class UsersTypesTeam < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :user_type
  ## UsersTypesTeam.find_or_create_by!(user_id: User.first.id, organization_id: org.id, user_type_id: UserType.first.id)
  belongs_to :organization, optional: true
  belongs_to :team, optional: true

  # Validations
  validates :user_id, presence: true
  validates :user_type_id, presence: true

  def user_type_role
    UserType.find(user_type_id)&.role
  end
end
