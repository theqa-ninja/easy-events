class RenameEventIdToEventId < ActiveRecord::Migration[7.1]
  def change
    rename_column :signups, :event_id, :event_id
  end
end
