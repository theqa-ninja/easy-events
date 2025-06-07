# frozen_string_literal: true

class AddSoftDeleteToVolunteerRoles < ActiveRecord::Migration[7.1]
  def change
    change_table :volunteer_roles do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end
  end
end
