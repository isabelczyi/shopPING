class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :lists, dependent: :destroy
  has_many :items, dependent: :destroy
  has_many :locations, through: :items
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_one_attached :photo
end
