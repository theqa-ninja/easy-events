Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :events, only: %i[index show create update destroy] do
      member do
        get 'signups', to: 'signups#index' # get list of all signups
        get 'checkins', to: 'signups#check_ins'
        get 'signup/:signup_id', to: 'signups#show'
        post 'signup', to: 'signups#create' # volunteer signing up
        patch 'signup/:signup_id', to: 'signups#update' # TODO: volunteer updating signup
        delete 'signup/:signup_id', to: 'signups#destroy' # TODO: volunteer deleting signup
      end
    end
    resources :organizations, only: %i[index show create update destroy]
    resources :users, only: %i[index show create update destroy] do
      collection do
        get 'me', to: 'users#me'
      end
    end
  end

  # resources :signups, only: [:index, :show, :edit, :create, :update, :destroy]
  resources :volunteer_roles
  # resources :users_types_teams

  # get '/events', to: 'api/v1/events#index'
  # get '/events/:id', to: 'api/v1/events#show'
  # get '/events/:id/edit', to: 'api/v1/events#edit'
  # get "events/:id/signup", to: "api/v1/events#signup"
  # get "events/:id/signups", to: "events#signups"
  # get "events/:id/check-ins", to: "api/v1/events#check_ins", as: :event_check_ins

  # resources :user_types
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
  resources :teams
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
