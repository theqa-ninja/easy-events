class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users, bulk: true do |t|
      ## Required
      t.provider :string, null: false, default: 'email'
      t.uid :string, null: false, default: ''

      ## Recoverable
      t.allow_password_change :boolean, default: false

      ## Confirmable
      t.confirmation_token :string
      t.confirmed_at :datetime
      t.confirmation_sent_at :datetime
      t.unconfirmed_email :string # Only if using reconfirmable

      ## Lockable
      # t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at

      ## Tokens
      t.tokens :json
    end

    add_index :users, %i[uid provider], unique: true
    add_index :users, :confirmation_token, unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
