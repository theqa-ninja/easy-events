class Team < ApplicationRecord
  belongs_to :organization
  has_many :volunteer_roles, dependent: :nullify
end
