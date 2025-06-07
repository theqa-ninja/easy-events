# frozen_string_literal: true

class ChangeEventInfosToEvents < ActiveRecord::Migration[7.1]
  def change
    rename_table :event_infos, :events
  end
end
