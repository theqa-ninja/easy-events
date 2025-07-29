module Api
  class TeamsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_org, only: %i[index show create update destroy]
    before_action :set_team, only: %i[show update destroy]
    before_action :redirect_if_no_create, only: %i[create]
    before_action :redirect_if_no_edit, only: %i[update destroy]
    before_action :redirect_if_no_view, only: %i[index show create update destroy]

    # GET organizations/:org_id/teams
    def index
      render json: @current_org.teams, status: :ok
    end

    # GET organizations/:org_id/teams/:team_id
    def show
      render json: @current_team.as_json(include: :volunteer_roles), status: :ok
    end

    # POST organizations/:org_id/teams/
    def create
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
    def set_org
      @current_org = Organization.where(id: params[:org_id]).first
      render_not_found if @current_org.nil?
    end

    def set_team
      @current_team = Team.where(id: params[:team_id], organization_id: @current_org.id).first
      render_not_found if @current_team.nil?
    end

    def render_not_found
      render json: { message: 'Team not found' }, status: :not_found
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:org_id, :name)
    end

    def redirect_if_no_create
      return if current_user.check_permissions(@current_org.id, nil, [:EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, nil, [:CREATE_TEAM])

      render json: { message: "You can't create teams" }, status: :unauthorized
    end

    def redirect_if_no_edit
      return if current_user.check_permissions(@current_org.id, nil, [:EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't edit teams" }, status: :unauthorized
    end

    def redirect_if_no_view
      return if current_user.check_permissions(@current_org.id, nil, %i[VIEW_ORG EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, nil,
                                               %i[VIEW_TEAM EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't view teams" }, status: :unauthorized
    end
  end
end
