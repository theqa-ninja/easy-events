class UsersTypesController < ApplicationController
  # TODO: I think this whole section should be deleted
  before_action :redirect_if_not_admin
  before_action :set_users_types_team, only: %i[show update destroy]

  # GET /users_types_teams or /users_types_teams.json
  def index
    render json: UsersTypesTeam.where(soft_deleted: false).as_json, status: :ok
  end

  # GET /users_types_teams/1 or /users_types_teams/1.json
  def show
    return render json: @users_types_team, status: :no_content if @users_types_team.nil?

    render json: @users_types_team.as_json, status: :ok
  end

  # POST /users_types_teams or /users_types_teams.json
  def create
    @users_types_team = UsersTypesTeam.new(users_types_team_params)

    if @users_types_team.save
      render json: @users_types_team, status: :created
    else
      render json: @users_types_team.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users_types_teams/1 or /users_types_teams/1.json
  def update
    if @users_types_team.update(users_types_team_params)
      render json: @users_types_team, status: :ok
    else
      render json: @users_types_team.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users_types_teams/1 or /users_types_teams/1.json
  def destroy
    @users_types_team.delete

    render json: @users_types_team, status: :accepted
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_users_types_team
    @users_types_team = UsersTypesTeam.where(soft_deleted: false).where(id: params[:id]).first
  end

  # Only allow a list of trusted parameters through.
  def users_types_team_params
    params.require(:users_types_team).permit(:user_id, :user_type_id, :team_id)
  end

  def redirect_if_not_admin
    # TODO: do we have @current_organization?
    return if current_user.admin?(@current_organization.id)

    render json: { message: 'You are not high enough to do that' },
           status: :unauthorized
  end
end
