# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :phone_number
      t.boolean :is_over_18, null: false

      t.timestamps
    end
  end
end
