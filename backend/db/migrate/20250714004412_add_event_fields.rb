class AddEventFields < ActiveRecord::Migration[7.1]
  def change
    change_table :events, bulk: true do |t|
      t.datetime :close_time, default: nil
      t.string :volunteer_role_ids, array: true, default: []
      t.string :event_lead_name, default: ''
    end
  end
end
