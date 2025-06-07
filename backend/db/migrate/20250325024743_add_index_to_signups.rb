class AddIndexToSignups < ActiveRecord::Migration[7.1]
  add_index :signups, %i[event_id user_email user_name], unique: true
end
