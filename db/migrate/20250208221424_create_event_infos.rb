class CreateEventInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :event_infos do |t|
      t.string :title
      t.date :date
      t.time :start_time
      t.time :end_time
      t.text :description
      t.integer :adult_signup_slots
      t.integer :teenager_slots

      t.timestamps
    end
  end
end
