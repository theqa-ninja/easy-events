class ApplicationController < ActionController::API
  include LoggerHelper
  include DeviseTokenAuth::Concerns::SetUserByToken

  protect_from_forgery with: :null_session
  before_action :update_sanitized_params, if: :devise_controller?

  def update_sanitized_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :phone_number, :is_over_18, :password, :password_confirmation])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :phone_number, :is_over_18, :password, :password_confirmation, :current_password])
  end
end
