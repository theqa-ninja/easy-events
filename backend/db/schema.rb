# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_07_26_203611) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "email_logs", force: :cascade do |t|
    t.string "to_email"
    t.string "from_email"
    t.string "email_type"
    t.string "subject"
    t.text "text_body"
    t.text "html_body"
    t.datetime "sent_at"
    t.string "error_messages"
    t.boolean "soft_deleted", default: false
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.text "description", null: false
    t.integer "adult_slots", null: false
    t.integer "teenager_slots", null: false
    t.integer "team_id", null: false
    t.integer "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
    t.datetime "close_time"
    t.string "volunteer_role_ids", default: [], array: true
    t.string "event_lead_name", default: ""
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
  end

  create_table "signups", force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "user_id"
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone_number"
    t.boolean "is_over_18", null: false
    t.text "notes"
    t.datetime "checked_in_at"
    t.datetime "cancelled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "volunteer_role_id"
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
    t.index ["event_id", "email", "name", "is_over_18", "soft_deleted"], name: "idx_on_event_id_email_name_is_over_18_soft_deleted_f300e9b2ae", unique: true
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.integer "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
  end

  create_table "user_types", force: :cascade do |t|
    t.string "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
    t.string "description", default: ""
    t.boolean "create_org", default: false
    t.boolean "edit_org", default: false
    t.boolean "view_org", default: false
    t.boolean "create_team", default: false
    t.boolean "edit_team", default: false
    t.boolean "view_team", default: false
    t.boolean "create_event", default: false
    t.boolean "edit_event", default: false
    t.boolean "view_event", default: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "phone_number"
    t.boolean "is_over_18", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.boolean "allow_password_change", default: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.json "tokens"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "users_types_teams", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "user_type_id", null: false
    t.integer "organization_id"
    t.integer "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
  end

  create_table "volunteer_notes", force: :cascade do |t|
    t.integer "user_id"
    t.integer "author_id", null: false
    t.integer "signup_id", null: false
    t.text "volunteer_notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
  end

  create_table "volunteer_roles", force: :cascade do |t|
    t.string "role", null: false
    t.integer "team_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "soft_deleted", default: false, null: false
    t.datetime "deleted_at"
  end

  add_foreign_key "events", "teams"
  add_foreign_key "events", "users", column: "creator_id"
  add_foreign_key "signups", "events"
  add_foreign_key "signups", "users"
  add_foreign_key "signups", "volunteer_roles"
  add_foreign_key "teams", "organizations"
  add_foreign_key "users_types_teams", "organizations"
  add_foreign_key "users_types_teams", "teams"
  add_foreign_key "users_types_teams", "user_types"
  add_foreign_key "users_types_teams", "users"
  add_foreign_key "volunteer_notes", "signups"
  add_foreign_key "volunteer_notes", "users"
  add_foreign_key "volunteer_notes", "users", column: "author_id"
  add_foreign_key "volunteer_roles", "teams"
end
