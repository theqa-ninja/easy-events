# rubocop:disable Metrics/BlockLength
Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :events, only: %i[index show create update destroy], param: :event_id do
      member do
        get 'signups', to: 'signups#index' # get list of all signups
        get 'checkins', to: 'events#checkins'
        get 'signup', to: 'signups#show'
        get 'signup/:signup_id', to: 'signups#show'
        post 'signup', to: 'signups#create' # volunteer signing up
        patch 'signup/:signup_id', to: 'signups#update'
        delete 'signup/:signup_id', to: 'signups#destroy'
      end
    end
    resources :organizations, only: %i[index show create update destroy], param: :org_id do
      member do
        # resources :teams, only: %i[index show create update destroy]
        get 'teams', to: 'teams#index' # get all teams for the organization
        get 'teams/:team_id', to: 'teams#show' # get a specific team
        post 'teams', to: 'teams#create' # create a new team in the organization
        patch 'teams/:team_id', to: 'teams#update' # update a specific team
        delete 'teams/:team_id', to: 'teams#destroy' # delete a specific team

        get 'organizers', to: 'organizations#organizers' # get a list of organizers
      end
    end
    resources :users, only: %i[index show create update destroy], param: :user_id do
      collection do
        get 'me', to: 'users#me'
        get 'signups', to: 'users#signups'
      end
    end
    resources :teams, only: %i[show update destroy], param: :team_id do
      member do
        resources :volunteer_roles, only: %i[index show create update destroy]
      end
    end
    resources :organizers_types, only: %i[index show] do
      collection do
        post 'assign', to: 'organizers_types#assign_type'
      end
    end
  end

  # resources :volunteer_roles
  # resources :organizers_types_teams

  # get '/events', to: 'api/v1/events#index'
  # get '/events/:id', to: 'api/v1/events#show'
  # get '/events/:id/edit', to: 'api/v1/events#edit'
  # get "events/:id/signup", to: "api/v1/events#signup"
  # get "events/:id/signups", to: "events#signups"
  # get "events/:id/check-ins", to: "api/v1/events#check_ins", as: :event_check_ins

  # resources :organizer_types
  # devise_for :users,
  #   :path => '',
  #   :path_names => {
  #     :sign_in => "user/login",
  #     :sign_out => "user/logout",
  #     :sign_up => "user/register"
  #   },
  #   :controllers => {
  #     :registrations => "registrations"
  #   }
  # devise_scope :user do
  #   get 'user/logout' => 'devise/sessions#destroy'
  # end

  # resources :users

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines event signup page that has the event info and signup form
  # get "events/:id/signup" => "api/v1/events#signup", as: :event_signup
  # get "events/:id/signups" => "api/v1/events#signups", as: :event_signups
  # get "events/:id/check-ins" => "api/v1/events#check_ins", as: :event_check_ins

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # root to: "home#index"
end
# rubocop:enable Metrics/BlockLength
