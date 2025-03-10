class UserTypesController < ApplicationController
  before_action :set_permissions
  before_action :set_user_type, only: %i[ show edit update destroy ]

  # GET /user_types or /user_types.json
  def index
    @user_types = UserType.all
  end

  # GET /user_types/1 or /user_types/1.json
  def show
  end

  # GET /user_types/new
  def new
    @user_type = UserType.new
  end

  # GET /user_types/1/edit
  def edit
  end

  # POST /user_types or /user_types.json
  def create
    @user_type = UserType.new(user_type_params)

    respond_to do |format|
      if @user_type.save
        format.html { redirect_to @user_type, notice: "User type was successfully created." }
        format.json { render :show, status: :created, location: @user_type }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_types/1 or /user_types/1.json
  def update
    respond_to do |format|
      if @user_type.update(user_type_params)
        format.html { redirect_to @user_type, notice: "User type was successfully updated." }
        format.json { render :show, status: :ok, location: @user_type }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_types/1 or /user_types/1.json
  def destroy
    @user_type.destroy!

    respond_to do |format|
      format.html { redirect_to user_types_path, status: :see_other, notice: "User type was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_type
      @user_type = UserType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_type_params
      params.require(:user_type).permit(:role)
    end

    def set_permissions
      if current_user
        @user_type_team = UsersTypesTeam.find_by(user_id: current_user.id)
        @user_is_admin = @user_type_team&.user_type == "admin"
      end
      redirect_to event_infos_path if !@user_is_admin
    end
end
