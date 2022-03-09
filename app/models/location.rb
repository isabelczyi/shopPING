class Location < ApplicationRecord
  belongs_to :item
  validates :address, presence: true
  reverse_geocoded_by :latitude, :longitude
end
