class Location < ApplicationRecord
  belongs_to :item
  validates :address, presence: true
end
