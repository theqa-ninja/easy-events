class CreateEmailLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :email_logs do |t|
      t.string :to_email
      t.string :from_email
      t.string :email_type
      t.string :subject
      t.text :text_body
      t.text :html_body
      t.datetime :sent_at
      t.string :error_messages

      t.boolean :soft_deleted, default: false
      t.datetime :deleted_at, default: nil

      t.timestamps
    end
  end
end
