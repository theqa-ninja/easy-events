class CreateUsersTypesGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :users_types_groups do |t|
      t.integer :user_id
      t.integer :user_type_id
      t.integer :group_id

      t.timestamps
    end
  end
end
