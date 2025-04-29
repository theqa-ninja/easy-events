class UsersTypesTeamsController < ApplicationController
  before_action :set_permissions
  before_action :set_users_types_team, only: %i[ show edit update destroy ]

  # GET /users_types_teams or /users_types_teams.json
  def index
    @users_types_teams = UsersTypesTeam.all
  end

  # GET /users_types_teams/1 or /users_types_teams/1.json
  def show
  end

  # GET /users_types_teams/new
  def new
    @users_types_team = UsersTypesTeam.new
  end

  # GET /users_types_teams/1/edit
  def edit
  end

  # POST /users_types_teams or /users_types_teams.json
  def create
    @users_types_team = UsersTypesTeam.new(users_types_team_params)

    respond_to do |format|
      if @users_types_team.save
        format.html { redirect_to @users_types_team, notice: "Users types team was successfully created." }
        format.json { render :show, status: :created, location: @users_types_team }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @users_types_team.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users_types_teams/1 or /users_types_teams/1.json
  def update
    respond_to do |format|
      if @users_types_team.update(users_types_team_params)
        format.html { redirect_to @users_types_team, notice: "Users types team was successfully updated." }
        format.json { render :show, status: :ok, location: @users_types_team }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @users_types_team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users_types_teams/1 or /users_types_teams/1.json
  def destroy
    @users_types_team.destroy!

    respond_to do |format|
      format.html { redirect_to users_types_teams_path, status: :see_other, notice: "Users types team was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_users_types_team
      @users_types_team = UsersTypesTeam.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def users_types_team_params
      params.require(:users_types_team).permit(:user_id, :user_type_id, :team_id)
    end

    def set_permissions
      if current_user
        @user_type_team = UsersTypesTeam.find_by(user_id: current_user.id)
        @user_is_admin = @user_type_team&.user_type == "admin"
      end
      redirect_to event_infos_path if !@user_is_admin
    end
end
