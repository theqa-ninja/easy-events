module Api
  class TeamsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_team, only: %i[show update destroy]
    before_action :redirect_if_not_admin, only: %i[create update destroy]
    before_action :redirect_if_not_lead, only: %i[show]

    # GET organizations/:org_id/teams
    def index
      current_org = Organization.where(id: params[:org_id]).first
      render json: { message: 'Organization not found' }, status: :not_found if current_org.nil?

      unless current_user.org_admin?(current_org.id)
        render json: { message: 'You are not authorized to view this organization' },
               status: :unauthorized
      end

      render json: current_org.teams, status: :ok
      # get all teams for the current organization based on the current user's organization
    end

    # GET organizations/:org_id/teams/:team_id
    def show
      render json: @current_team, status: :ok
    end

    # POST organizations/:org_id/teams/
    def create
      return render_unauthorized unless authorized_to_modify_teams

      new_team = Team.new(team_params)
      new_team.organization_id = params[:org_id]

      if new_team.save
        render json: new_team, status: :created
      else
        render json: new_team.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /teams/1
    def update
      return render_unauthorized unless authorized_to_modify_teams

      if @current_team.update(team_params)
        render json: @current_team, status: :ok
      else
        render json: @current_team.errors, status: :unprocessable_entity
      end
    end

    # DELETE organizations/:org_id/teams/:team_id
    def destroy
      @current_team.delete

      render json: { message: "Team #{@current_team.name} deleted" }, status: :accepted
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @current_team = Team.where(id: params[:team_id], organization_id: params[:org_id]).first
      render_not_found if @current_team.nil?
    end

    def render_not_found
      render json: { message: 'Team not found' }, status: :not_found
    end

    def authorized_to_modify_teams
      current_user.org_admin?(params[:org_id]) || current_user.leader?(@current_team.id)
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:org_id, :name)
    end

    def redirect_if_not_lead
      return if current_user.leader?(@current_team.id)

      render json: { message: 'You are not high enough to do that' }, status: :unauthorized
    end

    def redirect_if_not_admin
      return if current_user.org_admin?(params[:org_id])

      render json: { message: 'You are not high enough to do that' }, status: :unauthorized
    end
  end
end
