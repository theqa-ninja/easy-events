class CreateSignupGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :signup_groups do |t|
      t.string :group_name, null: false
      t.integer :primary_user_id, null: false

      t.timestamps
    end

    add_foreign_key :signup_groups, :users, column: :primary_user_id
  end
end
