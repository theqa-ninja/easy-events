class AddSoftDeletes < ActiveRecord::Migration[7.1]
  def change
    change_table :signups do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :events do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :users do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :users_types_teams do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :volunteer_notes do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :teams do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end
  end
end
