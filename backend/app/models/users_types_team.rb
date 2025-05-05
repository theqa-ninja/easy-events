class UsersTypesTeam < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :user_type
  belongs_to :organization

  # Validations
  validates :user_id, presence: true
  validates :user_type_id, presence: true
  validates :organization_id, presence: true

  def user_type
    UserType.find(user_type_id)&.role
  end
end
