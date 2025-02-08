json.extract! event_info, :id, :title, :date, :start_time, :end_time, :description, :adult_signup_slots, :teenager_slots, :created_at, :updated_at
json.url event_info_url(event_info, format: :json)
