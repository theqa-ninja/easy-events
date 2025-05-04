class RenameEventInfoIdToEventId < ActiveRecord::Migration[7.1]
  def change
    rename_column :signups, :event_info_id, :event_id
  end
end
