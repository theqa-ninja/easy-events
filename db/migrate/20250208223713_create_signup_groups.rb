class CreateSignupGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :signup_groups do |t|
      t.integer :user_id
      t.string :group_name

      t.timestamps
    end
  end
end
