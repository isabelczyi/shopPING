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
if Rails.env == 'development'
  User.destroy_all
  List.destroy_all
  Item.destroy_all
  Location.destroy_all
end
p "Seeding data.."

users = [
  'padmini@mail.com',
  'isabel@mail.com',
  'monika@mail.com',
  'sarah@mail.com'
]

# add user data
users.each do |user_email|
  user = User.create!(
    email: user_email,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    password: 'password'
  )


  lists = []
  5.times do
    lists << List.create!(
      name: Faker::Company.name,
      user: user
    )
  end

  lists.each do |list|
    item = Item.create!(
      name: Faker::Book.title,
      description: Faker::Book.publisher,
      list_id: list.id


    )


    location = Location.create!(
      address: "North Melbourne railway station",
      latitude: 37.8063,
      longitude: 144.9415,
      item_id: item.id
    )
  end

end

p "Created #{User.count} users..."
p "Created #{List.count} lists..."
p "Created #{Item.count} Itemss..."
p "Created #{Location.count} Locations..."
