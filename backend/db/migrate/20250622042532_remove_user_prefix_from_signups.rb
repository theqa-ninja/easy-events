class RemoveUserPrefixFromSignups < ActiveRecord::Migration[7.1]
  def change
    change_table :signups do |t|
      t.rename :user_name, :name
      t.rename :user_email, :email
      t.rename :user_phone_number, :phone_number
      t.rename :user_is_over_18, :is_over_18
    end
  end
end
