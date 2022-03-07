# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

p "Deleting previous data..."
# destroy data
User.destroy_all if Rails.env == 'development'
List.destroy_all if Rails.env == 'development'
Item.destroy_all if Rails.env == 'development'
Location.destroy_all if Rails.env == 'development'

p "Seeding data.."

# add user data
5.times do
  User.create(
    email: Faker::Internet.email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password: 'password'
  )
end

p "Created #{User.count} users..."

# add list data
25.times do
  List.create(
    name: Faker::Lorem.sentence(word_count: 3),
    user_id: rand(1..5)
  )
end

p "Created #{List.count} lists.."

# add item data
50.times do
  Item.create(
    name: Faker::Lorem.sentence(word_count: 3),
    description: Faker::Lorem.sentences,
    list_id: rand(1..25),
    completed: Faker::Boolean.boolean(true_ratio: 0.2),
    user_id: rand(1..25)
  )
end

p "Created #{List.count} lists.."

# add location data
25.times do
  Location.create(
    address: Faker::Address.city,
    item_id:
  )
end

p "Created #{Location.count} locations.."
