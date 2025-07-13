class DeleteSignupGroups < ActiveRecord::Migration[7.1]
  def change
    drop_table :signup_groups
  end
end
