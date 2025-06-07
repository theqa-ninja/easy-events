# frozen_string_literal: true

class AddSoftDeleteToOrganizations < ActiveRecord::Migration[7.1]
  def change
    change_table :organizations do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end
  end
end
