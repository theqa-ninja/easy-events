# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :organization
  has_many :volunteer_roles
end
