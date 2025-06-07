# frozen_string_literal: true

json.extract! users_types_team, :id, :user_id, :user_type_id, :team_id, :created_at, :updated_at
json.url users_types_team_url(users_types_team, format: :json)
