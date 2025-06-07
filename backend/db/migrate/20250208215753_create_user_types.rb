# frozen_string_literal: true

class CreateUserTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :user_types do |t|
      t.string :role, null: false

      t.timestamps
    end
  end
end
