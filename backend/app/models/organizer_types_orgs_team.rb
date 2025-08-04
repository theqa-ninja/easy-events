class OrganizerTypesOrgsTeam < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :organizer_type
  belongs_to :organization, optional: true
  belongs_to :team, optional: true

  # Validations
  validates :user_id, presence: true
  validates :organizer_type_id, presence: true

  def organizer_type_role
    OrganizerType.find(organizer_type_id)&.role
  end
end
