class AddSoftDeletes < ActiveRecord::Migration[7.1]
  # rubocop:disable Metrics/MethodLength,Metrics/AbcSize
  def change
    change_table :signups, bulk: true do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :event_infos, bulk: true do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :users, bulk: true do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :users_types_teams, bulk: true do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :volunteer_notes, bulk: true do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end

    change_table :teams, bulk: true do |t|
      t.boolean :soft_deleted, null: false, default: false
      t.datetime :deleted_at
    end
  end
  # rubocop:enable Metrics/MethodLength,Metrics/AbcSize
end
