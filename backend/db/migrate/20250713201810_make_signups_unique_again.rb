class MakeSignupsUniqueAgain < ActiveRecord::Migration[7.1]
  def change
    remove_index :signups, %i[event_id email name]
    add_index :signups, %i[event_id email name is_over_18 soft_deleted], unique: true
  end
end
