module Api
  class VolunteerRolesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_team_from_params
    before_action :set_volunteer_role, only: %i[show update destroy]
    before_action :redirect_if_no_create, only: %i[create]
    before_action :redirect_if_no_edit, only: %i[update destroy]
    before_action :redirect_if_no_view, only: %i[index show create update destroy]

    # GET /volunteer_roles
    def index
      # show all volunteer roles for the current team
      volunteer_roles = VolunteerRole.where(team_id: @current_team.id).order(:role)

      render json: volunteer_roles
    end

    # GET /volunteer_roles/1
    def show
      render json: @volunteer_role
    end

    # POST /volunteer_roles
    def create
      new_volunteer_role = VolunteerRole.new(volunteer_role_params)
      new_volunteer_role.team_id = @current_team.id

      if new_volunteer_role.save
        render json: new_volunteer_role, status: :created
      else
        render json: new_volunteer_role.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /volunteer_roles/1
    def update
      if @volunteer_role.update(volunteer_role_params)
        render json: @volunteer_role, status: :ok
      else
        render json: @volunteer_role.errors, status: :unprocessable_entity
      end
    end

    # DELETE /volunteer_roles/1
    def destroy
      @volunteer_role.delete
      render json: { message: "Volunteer role #{@volunteer_role.role} deleted" }, status: :accepted
    end

    private

    def set_team_from_params
      @current_team = Team.where(id: params[:team_id]).first
      if @current_team.nil?
        render_not_found
      else
        @current_org = @current_team.organization
      end
    end

    def render_not_found
      render json: { message: 'Volunteer Role not found' }, status: :not_found
    end

    def redirect_if_no_create
      # return if current_user.check_permissions(@current_org.id, nil, %i[EDIT_ORG])

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_TEAM CREATE_TEAM])

      render json: { message: 'You do not have permission to create volunteer roles' }, status: :unauthorized
    end

    def redirect_if_no_edit
      # return if current_user.check_permissions(@current_org.id, nil, %i[EDIT_ORG])

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_TEAM CREATE_TEAM])

      render json: { message: 'You do not have permission to edit volunteer roles' }, status: :unauthorized
    end

    def redirect_if_no_view
      # return if current_user.check_permissions(@current_org.id, nil, %i[EDIT_ORG])

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[VIEW_TEAM EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't view volunteer roles" }, status: :unauthorized
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_volunteer_role
      @volunteer_role = VolunteerRole.where(id: params[:id]).first
      render_not_found if @volunteer_role.nil?
    end

    # Only allow a list of trusted parameters through.
    def volunteer_role_params
      params.require(:volunteer_role).permit(:role, :description)
    end
  end
end
