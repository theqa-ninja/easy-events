class UsersTypesTeam < ApplicationRecord
  def user_type
    UserType.find(user_type_id)&.role
  end
end
