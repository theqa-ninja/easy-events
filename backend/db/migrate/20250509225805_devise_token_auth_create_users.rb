# frozen_string_literal: true

class DeviseTokenAuthCreateUsers < ActiveRecord::Migration[7.1]
  def change
    ## Required
    add_column :users,  :provider, :string, null: false, default: 'email'
    add_column :users,  :uid, :string, null: false, default: ''

    ## Recoverable
    add_column :users,  :allow_password_change, :boolean, default: false

    ## Confirmable
    add_column :users,  :confirmation_token, :string
    add_column :users,  :confirmed_at, :datetime
    add_column :users,  :confirmation_sent_at, :datetime
    add_column :users,  :unconfirmed_email, :string # Only if using reconfirmable

    ## Lockable
    # t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
    # t.string   :unlock_token # Only if unlock strategy is :email or :both
    # t.datetime :locked_at

    ## Tokens
    add_column :users, :tokens, :json

    add_index :users, %i[uid provider], unique: true
    add_index :users, :confirmation_token, unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
