class ChangeVolunteerRoleIdInEvent < ActiveRecord::Migration[7.1]
  def up
    change_table :events, bulk: true do |t|
      t.remove :volunteer_role_ids
      t.column :volunteer_roles, :json, array: true, default: []
    end
  end

  def down
    change_table :events, bulk: true do |t|
      t.remove :volunteer_roles
      t.column :volunteer_role_ids, :string, array: true
    end
  end
end
