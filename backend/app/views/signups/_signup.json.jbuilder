json.extract! signup, :id, :user_id, :event_id, :notes, :checked_in_at, :cancelled_at, :created_at, :updated_at
json.url signup_url(signup, format: :json)
