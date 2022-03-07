class Item < ApplicationRecord
  belongs_to :list, optional: true
  belongs_to :user

  has_many :locations, dependent: :destroy

  accepts_nested_attributes_for :locations, :reject_if => lambda { |a| a[:address].blank? }, allow_destroy: true

  validates :name, presence: true
end
