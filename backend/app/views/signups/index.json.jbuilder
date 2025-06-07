# frozen_string_literal: true

json.array! @signups, partial: 'signups/signup', as: :signup
