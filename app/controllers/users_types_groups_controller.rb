class UsersTypesGroupsController < ApplicationController
  before_action :set_users_types_group, only: %i[ show edit update destroy ]

  # GET /users_types_groups or /users_types_groups.json
  def index
    @users_types_groups = UsersTypesGroup.all
  end

  # GET /users_types_groups/1 or /users_types_groups/1.json
  def show
  end

  # GET /users_types_groups/new
  def new
    @users_types_group = UsersTypesGroup.new
  end

  # GET /users_types_groups/1/edit
  def edit
  end

  # POST /users_types_groups or /users_types_groups.json
  def create
    @users_types_group = UsersTypesGroup.new(users_types_group_params)

    respond_to do |format|
      if @users_types_group.save
        format.html { redirect_to @users_types_group, notice: "Users types group was successfully created." }
        format.json { render :show, status: :created, location: @users_types_group }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @users_types_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users_types_groups/1 or /users_types_groups/1.json
  def update
    respond_to do |format|
      if @users_types_group.update(users_types_group_params)
        format.html { redirect_to @users_types_group, notice: "Users types group was successfully updated." }
        format.json { render :show, status: :ok, location: @users_types_group }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @users_types_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users_types_groups/1 or /users_types_groups/1.json
  def destroy
    @users_types_group.destroy!

    respond_to do |format|
      format.html { redirect_to users_types_groups_path, status: :see_other, notice: "Users types group was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_users_types_group
      @users_types_group = UsersTypesGroup.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def users_types_group_params
      params.require(:users_types_group).permit(:user_id, :user_type_id, :group_id)
    end
end
