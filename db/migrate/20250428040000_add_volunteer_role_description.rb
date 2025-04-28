class AddVolunteerRoleDescription < ActiveRecord::Migration[7.1]
  def change
    add_column :volunteer_roles, :description, :text
  end
end
