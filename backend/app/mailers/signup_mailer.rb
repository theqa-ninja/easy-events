class SignupMailer < ApplicationMailer
  default template_path: 'signup_mailer'

  def signup_confirmation(signup, event, domain)
    @signup = signup
    @event = event
    @domain = domain
    mail(to: @signup.user_email, subject: 'Volunteering Confirmation')
  end
end
