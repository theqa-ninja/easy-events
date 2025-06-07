# frozen_string_literal: true

class CustomMailer < Devise::Mailer
  # helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  # include ActionView::Helpers::UrlHelper
  # include ActionView::Helpers::TranslationHelper
  # include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views
  # default bcc: 'no-reply@dishdeets.com' # we can turn this on for copies of the e-mails
end
