class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'

  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views

  layout 'mailer'

  after_action :log_email

  private

  def log_email
    EmailLog.create!(
      to_email: mail.to,
      from_email: mail.from,
      email_type: self.class.name,
      subject: mail.subject,
      text_body: generate_text_body,
      html_body: generate_html_body,
      error_messages: mail.errors,
      sent_at: Time.current
    )
  end

  def generate_text_body
    if mail.multipart?
      mail.text_part&.body&.decoded
    else
      mail&.body&.decoded
    end
  end

  def generate_html_body
    if mail.multipart?
      mail.html_part&.body&.decoded # pulled from https://stackoverflow.com/questions/4179901/receive-an-email-with-actionmailer-and-read-the-plain-body-text
    else
      mail&.body&.decoded
    end
  end
end
