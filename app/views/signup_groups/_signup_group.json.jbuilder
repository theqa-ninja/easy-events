json.extract! signup_group, :id, :user_id, :group_name, :created_at, :updated_at
json.url signup_group_url(signup_group, format: :json)
