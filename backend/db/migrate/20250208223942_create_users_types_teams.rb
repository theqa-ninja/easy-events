class CreateUsersTypesTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :users_types_teams do |t|
      t.integer :user_id, null: false
      t.integer :user_type_id, null: false
      t.integer :organization_id, null: false
      t.integer :team_id

      t.timestamps
    end

    add_foreign_key :users_types_teams, :users, column: :user_id
    add_foreign_key :users_types_teams, :user_types, column: :user_type_id
    add_foreign_key :users_types_teams, :organizations, column: :organization_id
    add_foreign_key :users_types_teams, :teams, column: :team_id
  end
end
