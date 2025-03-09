class CreateVolunteerNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :volunteer_notes do |t|

      t.integer :user_id, null: false
      t.integer :author_id, null: false
      t.integer :event_id, null: true
      t.text :volunteer_notes

      t.timestamps
    end

    add_foreign_key :volunteer_notes, :users, column: :user_id
    add_foreign_key :volunteer_notes, :users, column: :author_id
    add_foreign_key :volunteer_notes, :event_infos, column: :event_id
  end
end
