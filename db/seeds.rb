# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'ffaker'

if Rails.env != 'production'
  puts 'creating organizations...'
  org = Organization.find_or_create_by!(name: FFaker::Company.unique.name)

  puts 'creating users...'
  5.times do
    phone_number = FFaker::Boolean.maybe ? FFaker::PhoneNumber.unique.phone_number : ""
    user = User.create(email: FFaker::Internet.unique.email, name: FFaker::Name.unique.name, password: 'password', is_over_18: FFaker::Boolean.maybe, phone_number: phone_number)
    puts "created #{user.email}"
  end

  puts 'creating teams...'
  2.times do
    Team.find_or_create_by!(name: FFaker::Company.unique.name, organization_id: org.id)
  end

  puts 'creating user types...'
  UserType.find_or_create_by!(role: 'Admin')
  UserType.find_or_create_by!(role: 'Event Coordinator')

  puts 'creating user types teams...'
  UsersTypesTeam.find_or_create_by!(user_id: User.first.id, organization_id: org.id, user_type_id: UserType.first.id)
  puts "made #{User.first.email} as an #{UserType.second.role} for #{org.name}"
  UsersTypesTeam.find_or_create_by!(user_id: User.second.id, organization_id: org.id, team_id: Team.second.id, user_type_id: UserType.second.id)
  puts "made #{User.second.email} as a #{UserType.second.role} for #{org.name} on Team: #{Team.second.name}"

  puts "creating events..."
  5.times do |i|
    tempdate = DateTime.now - 1.day + i.day
    starttime = FFaker::Time.between(tempdate, tempdate + 1.day)
    e = EventInfo.create(
      title: FFaker::CheesyLingo.title,
      description: FFaker::CheesyLingo.paragraph,
      start_time: starttime,
      end_time: starttime + 3.hour,
      adult_signup_slots: (5..12).to_a.sample,
      teenager_slots: (1..10).to_a.sample,
      creator_id: UsersTypesTeam.all.sample.user_id,
      team_id: Team.all.where(organization_id: 1).sample.id)

    puts "created #{e.title}"
  end
end
