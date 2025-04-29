class CreateEventInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :event_infos do |t|
      t.string :title, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.text :description, null: false
      t.integer :adult_slots, null: false
      t.integer :teenager_slots, null: false
      t.integer :team_id, null: false
      t.integer :creator_id, null: false

      t.timestamps
    end

    add_foreign_key :event_infos, :users, column: :creator_id
  end
end
