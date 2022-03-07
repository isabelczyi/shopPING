class Item < ApplicationRecord
  belongs_to :list
  has_many :locations, dependent: :destroy
  validates :name, presence: true
end
