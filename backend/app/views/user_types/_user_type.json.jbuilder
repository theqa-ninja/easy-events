# frozen_string_literal: true

json.extract! user_type, :id, :role, :created_at, :updated_at
json.url user_type_url(user_type, format: :json)
