class ApplicationController < ActionController::API
  include LoggerHelper
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :update_sanitized_params, if: :devise_controller?

  def update_sanitized_params
    devise_parameter_sanitizer.permit(:sign_up,
                                      keys: %i[name email phone_number is_over_18 password password_confirmation])
    devise_parameter_sanitizer.permit(:account_update,
                                      keys: %i[name email phone_number is_over_18 password password_confirmation
                                               current_password])
  end
end
