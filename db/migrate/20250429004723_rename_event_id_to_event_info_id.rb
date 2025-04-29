class RenameEventIdToEventInfoId < ActiveRecord::Migration[7.1]
  def change
    rename_column :signups, :event_id, :event_info_id
  end
end
