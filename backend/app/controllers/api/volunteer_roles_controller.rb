module Api
  class VolunteerRolesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_team_from_params
    before_action :redirect_if_not_lead, only: %i[show]
    before_action :set_volunteer_role, only: %i[show update destroy]

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
      render json: { message: 'Team not found' }, status: :not_found if @current_team.nil?
    end

    def redirect_if_not_lead
      return if current_user.leader?(@current_team.id)

      render json: { message: 'You are not high enough to do that' }, status: :unauthorized
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_volunteer_role
      @volunteer_role = VolunteerRole.where(id: params[:id]).first
      render json: { message: 'Volunteer role not found' }, status: :not_found if @volunteer_role.nil?
    end

    # Only allow a list of trusted parameters through.
    def volunteer_role_params
      params.require(:volunteer_role).permit(:role, :description)
    end
  end
end
