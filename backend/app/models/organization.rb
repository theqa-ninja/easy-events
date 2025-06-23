class Organization < ApplicationRecord
  has_many :teams, dependent: :destroy
  has_many :events, through: :teams

  validates :name, presence: true

  def teams
    Team.where(organization_id: id)
  end

  def as_json(_options = {})
    super(methods: [:teams])
  end
end
