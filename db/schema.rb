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

ActiveRecord::Schema[7.1].define(version: 2025_03_09_013443) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_infos", force: :cascade do |t|
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
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "signup_groups", force: :cascade do |t|
    t.string "group_name", null: false
    t.integer "primary_user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "signups", force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "user_id"
    t.string "user_name", null: false
    t.string "user_email", null: false
    t.string "user_phone_number"
    t.boolean "user_is_over_18", null: false
    t.text "notes"
    t.datetime "checked_in_at"
    t.datetime "cancelled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "name", null: false
    t.integer "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_types", force: :cascade do |t|
    t.string "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_types_teams", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "user_type_id", null: false
    t.integer "organization_id", null: false
    t.integer "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "volunteer_notes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "author_id", null: false
    t.integer "event_id"
    t.text "volunteer_notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "event_infos", "teams"
  add_foreign_key "event_infos", "users", column: "creator_id"
  add_foreign_key "signup_groups", "users", column: "primary_user_id"
  add_foreign_key "signups", "event_infos", column: "event_id"
  add_foreign_key "signups", "users"
  add_foreign_key "teams", "organizations"
  add_foreign_key "users_types_teams", "organizations"
  add_foreign_key "users_types_teams", "teams"
  add_foreign_key "users_types_teams", "user_types"
  add_foreign_key "users_types_teams", "users"
  add_foreign_key "volunteer_notes", "event_infos", column: "event_id"
  add_foreign_key "volunteer_notes", "users"
  add_foreign_key "volunteer_notes", "users", column: "author_id"
end
