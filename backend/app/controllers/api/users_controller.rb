module Api
  class UsersController < ApplicationController
    before_action :set_user_for_edit, only: %i[show update destroy]
    before_action :authenticate_user!, only: %i[index show me update destroy]
    before_action :redirect_if_no_create, only: %i[create]
    before_action :redirect_if_no_edit, only: %i[update destroy]
    before_action :redirect_if_no_view, only: %i[index show update destroy]

    # GET /users/me
    def me
      render json: current_user.as_json.merge({ team_permissions: current_user.team_permissions.as_json }), status: :ok
    end

    # GET /users
    def index
      all_users = User.where(soft_deleted: false)
      render json: all_users, status: :ok
    end

    # GET /users/1
    def show
      render json: @user_to_modify.as_json, status: :ok
    end

    # POST /users
    def create
      new_user = User.new(user_params)

      if new_user.save
        render json: new_user, status: :created
      else
        render json: new_user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      if @user_to_modify.update(user_params)
        render json: @user_to_modify, status: :ok
      else
        render json: @user_to_modify.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @user_to_modify.delete
      render json: { message: "User #{@user_to_modify.email} deleted" }, status: :accepted
    end

    def signups
      return if current_user == nil
      my_signups = Signup.where(user_id: current_user.id).where(soft_deleted: false)
      render json: my_signups, status: :ok
    end

    private

    def render_not_found
      render json: { message: 'User not found' }, status: :not_found
    end

    def render_unauthorized
      render json: { message: "don't try to mess other people's accounts!" }, status: :unauthorized
    end

    def set_user_for_edit
      @user_to_modify = User.where(soft_deleted: false).find_by(id: params[:user_id])
      render_not_found if @user_to_modify.nil?
    end

    # checks if the current user is the one who made the signup
    def current_user_for_modify?
      return false if @user_to_modify.nil?

      @user_to_modify.id == current_user.id
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :phone_number, :password, :is_over_18)
    end

    def redirect_if_no_create
      # anyone can create a user
    end

    def redirect_if_no_edit
      return if current_user_for_modify?

      # return if current_user.check_permissions(nil, nil, [:EDIT_ORG]) # check if edit_org

      render_unauthorized
    end

    def redirect_if_no_view
      return if current_user_for_modify? # allow user to view their own account
      if current_user.check_permissions(nil, nil,
                                        %i[CREATE_ORG EDIT_ORG VIEW_ORG CREATE_TEAM EDIT_TEAM VIEW_TEAM CREATE_EVENT EDIT_EVENT VIEW_EVENT])
        return # anyone who is a lead can view other signed up users
      end

      render json: { message: "You can't view other people's accounts" }, status: :unauthorized
    end
  end
end
