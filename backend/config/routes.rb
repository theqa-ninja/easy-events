Rails.application.routes.draw do
  resources :volunteer_roles
  resources :organizations
  resources :users_types_teams
  resources :signups, only: [:show, :edit, :create, :update, :destroy]
  resources :event_infos
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
  get "event_infos/:id/signup" => "event_infos#signup", as: :event_info_signup
  get "event_infos/:id/signups" => "event_infos#signups", as: :event_info_signups
  get "event_infos/:id/check-ins" => "event_infos#check_ins", as: :event_info_check_ins

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root to: "home#index"

end
