class AddVolunteerRolesToSignups < ActiveRecord::Migration[7.1]
  def change
    change_table :signups do |t|
      t.integer :volunteer_role_id
    end

    add_foreign_key :signups, :volunteer_roles
  end
end
