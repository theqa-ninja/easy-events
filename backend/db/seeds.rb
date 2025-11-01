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

unless Rails.env.production?
  # rubocop:disable Metrics/BlockLength, Rails/Output
  puts 'creating organizations...'
  # org = Organization.find_or_create_by!(name: FFaker::Company.unique.name)
  org = Organization.find_or_create_by!(name: 'Vineyard Church')

  user = User.create(email: 'testuser@example.com', name: 'Test SuperAdmin', password: 'passcode', is_over_18: true,
                     phone_number: '867-5309', confirmed_at: Time.zone.now)
  puts "created #{user.email}"

  user = User.create(email: 'testuser+admin@example.com', name: 'Test Admin', password: 'passcode', is_over_18: true,
                     phone_number: '867-5309', confirmed_at: Time.zone.now)
  puts "created #{user.email}"

  user = User.create(email: 'testuser+lead@example.com', name: 'Test Team Lead', password: 'passcode', is_over_18: true,
                     phone_number: '867-5309', confirmed_at: Time.zone.now)
  puts "created #{user.email}"

  puts 'creating users...'
  5.times do
    phone_number = FFaker::Boolean.maybe ? FFaker::PhoneNumber.unique.phone_number : ''
    user = User.create(email: FFaker::Internet.unique.email, name: FFaker::Name.unique.name, password: 'passcode',
                       is_over_18: FFaker::Boolean.maybe, phone_number: phone_number, confirmed_at: Time.zone.now)
    puts "created #{user.email}"
  end

  puts 'creating teams...'
  Team.find_or_create_by!(name: 'Food Pantry', organization_id: org.id)
  Team.find_or_create_by!(name: 'Clothes Closet', organization_id: org.id)
  Team.find_or_create_by!(name: 'Resource Center', organization_id: org.id)
  # 2.times do
  #   Team.find_or_create_by!(name: FFaker::Company.unique.name, organization_id: org.id)
  # end

  puts 'creating user types...'
  OrganizerType.find_or_create_by!(role: 'internal admin', description: 'Can create orgs', create_org: true, edit_org: true, view_org: true)
  OrganizerType.find_or_create_by!(
    role: 'org team event', description: 'Can manage their current org and create new teams', edit_org: true, view_org: true,
    create_team: true, edit_team: true, view_team: true, create_event: true, edit_event: true, view_event: true
  )
  OrganizerType.find_or_create_by!(
    role: 'team event', description: 'Can manage their events', view_team: true, create_event: true, edit_event: true,
    view_event: true
  )

  puts 'creating user types teams...'
  OrganizerTypesOrgsTeam.find_or_create_by!(user_id: User.first.id, organization_id: nil, organizer_type_id: OrganizerType.first.id)
  puts "made #{User.first.email} as an #{OrganizerType.first.role}"
  OrganizerTypesOrgsTeam.find_or_create_by!(user_id: User.second.id, organization_id: org.id, team_id: Team.first.id,
                                            organizer_type_id: OrganizerType.second.id)
  puts "made #{User.second.email} as a #{OrganizerType.second.role} for #{org.name} on Team: #{Team.second.name}"

  OrganizerTypesOrgsTeam.find_or_create_by!(user_id: User.third.id, organization_id: org.id, team_id: Team.first.id,
                                            organizer_type_id: OrganizerType.third.id)
  puts "made #{User.third.email} as a #{OrganizerType.third.role} for #{org.name} on Team: #{Team.first.name}"

  puts "creating volunteer roles for team #{Team.first.name}"
  VolunteerRole.find_or_create_by!(role: 'Cart Runner', description: 'Runs the cart to the car', team_id: Team.first.id)
  VolunteerRole.find_or_create_by!(role: 'Personal Shopper', description: 'Helps patrons pick out the food',
                                   team_id: Team.first.id)
  VolunteerRole.find_or_create_by!(role: 'Restocker', description: 'Restocks the lines', team_id: Team.first.id)
  VolunteerRole.find_or_create_by!(role: 'Registration', description: 'Checks patrons in', team_id: Team.first.id)
  VolunteerRole.find_or_create_by!(role: 'Greeter', description: 'Greets people', team_id: Team.first.id)

  puts "creating volunteer roles for team #{Team.second.name}"
  VolunteerRole.find_or_create_by!(role: 'Clothes Sorter', team_id: Team.second.id)
  VolunteerRole.find_or_create_by!(role: 'Cashier', team_id: Team.second.id)

  puts 'creating events...'
  3.times do |i|
    tempdate = DateTime.now - 1.day + i.day
    starttime = FFaker::Time.between(tempdate, tempdate + 1.day)
    team_id = Team.all.where(organization_id: 1).sample.id
    e = Event.create!(
      title: FFaker::CheesyLingo.title,
      description: FFaker::CheesyLingo.paragraph,
      start_time: starttime,
      end_time: starttime + 3.hours,
      close_time: starttime + 2.hours,
      event_lead_name: FFaker::Name.unique.name,
      volunteer_roles:
      [{ "role_id": VolunteerRole.all.sample.id, "count": (1..3).to_a.sample },
       { "role_id": VolunteerRole.all.sample.id, "count": (1..3).to_a.sample }],
      adult_slots: (5..12).to_a.sample,
      teenager_slots: (1..10).to_a.sample,
      creator_id: OrganizerTypesOrgsTeam.all.sample.user_id,
      team_id: team_id
    )

    puts "created Event: #{e.title}"

    puts 'creating sign ups...'
    (3..6).to_a.sample.times do
      if FFaker::Boolean.maybe
        u = User.all.sample
        u_id = u.id
        u_name = u.name
        u_email = u.email
        u_phone_number = u.phone_number
        u_is_over_18 = u.is_over_18
      else
        u_name = FFaker::Name.unique.name
        u_email = FFaker::Internet.unique.email
        u_phone_number = FFaker::PhoneNumber.unique.phone_number if FFaker::Boolean.maybe
        u_is_over_18 = FFaker::Boolean.maybe
      end
      u_notes = FFaker::FreedomIpsum.sentence if (FFaker::Number.number % 5).zero?
      Signup.create(event_id: e.id, user_id: u_id, name: u_name, email: u_email,
                    phone_number: u_phone_number, is_over_18: u_is_over_18, notes: u_notes)
      puts "added user #{u_name} to event #{e.title}"
    end
  end
  # rubocop:enable Metrics/BlockLength, Rails/Output
end
