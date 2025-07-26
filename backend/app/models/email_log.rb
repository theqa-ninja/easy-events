class EmailLog < ApplicationRecord
  validates :to_email, :from_email, :email_type, :subject, :text_body, :html_body, :sent_at, :error_messages, presence: true
end
