class CreateTeams < ActiveRecord::Migration[7.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.integer :organization_id, null: false

      t.timestamps
    end

    add_foreign_key :teams, :organizations, column: :organization_id
    add_foreign_key :events, :teams, column: :team_id
  end
end
