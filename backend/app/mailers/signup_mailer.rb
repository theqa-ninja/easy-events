class SignupMailer < ApplicationMailer
  default template_path: 'signup_mailer'

  def signup_confirmation(main_signup, additional_signups, event, domain)
    @main_signup = main_signup
    @additional_signups = additional_signups
    @event = event
    @domain = domain
    mail(to: @main_signup.email, subject: 'Volunteering Confirmation')
  end
end
