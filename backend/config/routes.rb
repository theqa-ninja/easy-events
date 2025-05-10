Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :events, only: [:index, :show, :create, :update, :destroy] do
        member do
          get 'signups'
          get 'checkins', to: 'events#check_ins'
        end
      end

      resources :signups, only: [:index, :show, :edit, :create, :update, :destroy]
    end
  end
  resources :volunteer_roles
  resources :organizations
  resources :users_types_teams

  # get '/events', to: 'api/v1/events#index'
  # get '/events/:id', to: 'api/v1/events#show'
  # get '/events/:id/edit', to: 'api/v1/events#edit'
  # get "events/:id/signup", to: "api/v1/events#signup"
  # get "events/:id/signups", to: "events#signups"
  # get "events/:id/check-ins", to: "api/v1/events#check_ins", as: :event_check_ins

  resources :user_types
  devise_for :users,
    :path => '',
    :path_names => {
      :sign_in => "user/login",
      :sign_out => "user/logout",
      :sign_up => "user/register"
    },
    :controllers => {
      :registrations => "registrations"
    }
  devise_scope :user do
    get 'user/logout' => 'devise/sessions#destroy'
  end

  resources :users
  resources :teams
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines event signup page that has the event info and signup form
  # get "events/:id/signup" => "api/v1/events#signup", as: :event_signup
  # get "events/:id/signups" => "api/v1/events#signups", as: :event_signups
  # get "events/:id/check-ins" => "api/v1/events#check_ins", as: :event_check_ins

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root to: "home#index"

end
