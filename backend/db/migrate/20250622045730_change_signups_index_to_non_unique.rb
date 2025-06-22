class ChangeSignupsIndexToNonUnique < ActiveRecord::Migration[7.1]
  def change
    remove_index :signups, %i[event_id email name]
    add_index :signups, %i[event_id email name], unique: false
  end
end
