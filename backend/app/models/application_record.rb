class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # include LoggerHelper

  default_scope { select(column_names - %w[soft_deleted deleted_at created_at]).where(soft_deleted: false) }
  scope :only_deleted, -> { unscope(where: :soft_deleted).where(soft_deleted: true) }
  scope :with_deleted, -> { unscope(where: :soft_deleted) }
  scope :everything, -> { select(column_names) }

  def self.active
    where(soft_deleted: false)
  end

  def set_soft_delete
    self.soft_deleted = true
    self.deleted_at = Time.zone.now
    save
  end

  def delete
    set_soft_delete
  end

  def undo_delete
    self.soft_deleted = false
    self.deleted_at = nil
    save
  end

  def deleted?
    soft_deleted.present?
  end
end
