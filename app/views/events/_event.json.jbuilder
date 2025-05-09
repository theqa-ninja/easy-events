json.extract! event, :id, :title, :start_time, :end_time, :description, :adult_slots, :remaining_adult_slots, :teenager_slots, :remaining_teenager_slots, :volunteer_role_counts, :created_at, :updated_at
json.url event_url(event, format: :json)
