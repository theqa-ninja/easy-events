class CreateVolunteerNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :volunteer_notes do |t|

      t.integer :user_id
      t.integer :author_id, null: false
      t.integer :signup_id, null: false
      t.text :volunteer_notes

      t.timestamps
    end

    add_foreign_key :volunteer_notes, :users, column: :user_id
    add_foreign_key :volunteer_notes, :users, column: :author_id
    add_foreign_key :volunteer_notes, :signups, column: :signup_id
  end
end
