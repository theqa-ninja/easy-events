# frozen_string_literal: true

json.array! @user_types, partial: 'user_types/user_type', as: :user_type
