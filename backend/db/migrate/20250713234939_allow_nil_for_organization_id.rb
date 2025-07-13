class AllowNilForOrganizationId < ActiveRecord::Migration[7.1]
  def change
    change_column_null :users_types_teams, :organization_id, true
  end
end
