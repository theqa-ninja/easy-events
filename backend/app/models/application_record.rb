class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # include LoggerHelper

  default_scope { select(self.column_names - ["soft_deleted", "deleted_at", "created_at"]).where(soft_deleted: false) }
  scope :only_deleted, -> { unscope(where: :soft_deleted).where(soft_deleted: true) }
  scope :with_deleted, -> { unscope(where: :soft_deleted) }
  scope :everything, -> { select(self.column_names) }

  def set_soft_delete
    self.soft_deleted = true
    self.deleted_at = Time.now
    self.save
  end

  def delete
    set_soft_delete
  end

  def undo_delete
    self.soft_deleted = false
    self.deleted_at = nil
    self.save
  end

  def deleted?
    self.soft_deleted.present?
  end
end
