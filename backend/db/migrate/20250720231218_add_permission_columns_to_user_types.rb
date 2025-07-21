class AddPermissionColumnsToUserTypes < ActiveRecord::Migration[7.1]
  def change
    change_table :user_types, bulk: true do |t|
      t.string :description, default: ''
      # org level permissions
      t.boolean :create_org, default: false
      t.boolean :edit_org, default: false
      t.boolean :view_org, default: false

      # team level permissions
      t.boolean :create_team, default: false
      t.boolean :edit_team, default: false
      t.boolean :view_team, default: false

      # event level permissions
      t.boolean :create_event, default: false
      t.boolean :edit_event, default: false
      t.boolean :view_event, default: false
    end
  end
end
