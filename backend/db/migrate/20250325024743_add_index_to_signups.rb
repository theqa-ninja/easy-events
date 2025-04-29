class AddIndexToSignups < ActiveRecord::Migration[7.1]
  add_index :signups, [:event_id, :user_email, :user_name], unique: true
end
