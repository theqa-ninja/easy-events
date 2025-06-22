class SignupMailer < ApplicationMailer
  default template_path: 'signup_mailer'

  def signup_confirmation(signup, event, domain)
    @signup = signup
    @event = event
    @domain = domain
    mail(to: @signup.email, subject: 'Volunteering Confirmation')
  end
end
