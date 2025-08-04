class ChangeUserTypesToOrganizersTypes < ActiveRecord::Migration[7.1]
  def change
    rename_table :user_types, :organizer_types

    rename_column :users_types_teams, :user_type_id, :organizer_type_id

    rename_table :users_types_teams, :organizer_types_orgs_teams
  end
end
