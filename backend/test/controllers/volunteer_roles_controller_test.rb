require "test_helper"

class VolunteerRolesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @volunteer_role = volunteer_roles(:one)
  end

  test "should get index" do
    get volunteer_roles_url
    assert_response :success
  end

  test "should get new" do
    get new_volunteer_role_url
    assert_response :success
  end

  test "should create volunteer_role" do
    assert_difference("VolunteerRole.count") do
      post volunteer_roles_url, params: { volunteer_role: {  } }
    end

    assert_redirected_to volunteer_role_url(VolunteerRole.last)
  end

  test "should show volunteer_role" do
    get volunteer_role_url(@volunteer_role)
    assert_response :success
  end

  test "should get edit" do
    get edit_volunteer_role_url(@volunteer_role)
    assert_response :success
  end

  test "should update volunteer_role" do
    patch volunteer_role_url(@volunteer_role), params: { volunteer_role: {  } }
    assert_redirected_to volunteer_role_url(@volunteer_role)
  end

  test "should destroy volunteer_role" do
    assert_difference("VolunteerRole.count", -1) do
      delete volunteer_role_url(@volunteer_role)
    end

    assert_redirected_to volunteer_roles_url
  end
end
