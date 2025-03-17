class CreateVolunteerRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :volunteer_roles do |t|

      t.string :role, null: false
      t.integer :team_id, null: false

      t.timestamps
    end

    add_foreign_key :volunteer_roles, :teams
  end
end
