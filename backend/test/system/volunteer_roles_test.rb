require 'application_system_test_case'

class VolunteerRolesTest < ApplicationSystemTestCase
  setup do
    @volunteer_role = volunteer_roles(:one)
  end

  test 'visiting the index' do
    visit volunteer_roles_url
    assert_selector 'h1', text: 'Volunteer roles'
  end

  test 'should create volunteer role' do
    visit volunteer_roles_url
    click_on 'New volunteer role'

    click_on 'Create Volunteer role'

    assert_text 'Volunteer role was successfully created'
    click_on 'Back'
  end

  test 'should update Volunteer role' do
    visit volunteer_role_url(@volunteer_role)
    click_on 'Edit this volunteer role', match: :first

    click_on 'Update Volunteer role'

    assert_text 'Volunteer role was successfully updated'
    click_on 'Back'
  end

  test 'should destroy Volunteer role' do
    visit volunteer_role_url(@volunteer_role)
    click_on 'Destroy this volunteer role', match: :first

    assert_text 'Volunteer role was successfully destroyed'
  end
end
