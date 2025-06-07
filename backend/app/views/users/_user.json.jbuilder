json.extract! user, :id, :name, :email, :phone_number, :is_over_18, :created_at, :updated_at
json.url user_url(user, format: :json)
