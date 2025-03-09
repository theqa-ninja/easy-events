class CreateSignups < ActiveRecord::Migration[7.1]
  def change
    create_table :signups do |t|
      t.integer :user_id, null: false
      t.integer :event_id, null: false
      t.text :volunteer_notes
      t.datetime :checked_in_at
      t.datetime :cancelled_at

      t.timestamps
    end

    add_foreign_key :signups, :users, column: :user_id
    add_foreign_key :signups, :event_infos, column: :event_id
  end
end
