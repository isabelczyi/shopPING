class Item < ApplicationRecord
  belongs_to :list, optional: true
  belongs_to :user

  has_many :locations, dependent: :destroy

  accepts_nested_attributes_for :locations, :reject_if => lambda { |a| a[:address].blank? }, allow_destroy: true
  accepts_nested_attributes_for :list, :reject_if => lambda { |b| b[:name].blank? }, allow_destroy: true

  validates :name, presence: true

  def markers
    locations.geocoded.map do |location|
      {
        lat: location.latitude,
        lng: location.longitude,
        info_window: ApplicationController.new.render_to_string(partial: 'items/info_window', locals: { location: location })
        # info_window: render_to_string(partial: "items/info_window", locals: { location: location })
      }
    end
  end
end
