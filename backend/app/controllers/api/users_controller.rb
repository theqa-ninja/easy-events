module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!, only: %i[index show me update destroy]
    before_action :redirect_if_not_admin, only: %i[index show]

    # GET /users/me
    def me
      render json: current_user
    end

    # GET /users
    def index
      User.where(soft_deleted: false).sort_by(&:start_time)
    end

    # GET /users/1
    def show
      search_user = User.where(soft_deleted: false).where(id: params[:user_id]).first
      return render json: search_user, status: :no_content if search_user.nil?

      render json: search_user.as_json, status: :ok
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
      user = find_user
      return render_not_found unless user
      return render_unauthorized unless authorized_to_update?(user)

      update_user(user)
    end

    def destroy
      user = find_user
      return render_not_found unless user
      return render_unauthorized unless authorized_to_update?(user)

      user.delete
      render json: { message: "User #{user.email} deleted" }, status: :accepted
    end

    private

    def find_user
      User.where(soft_deleted: false).find_by(id: params[:user_id])
    end

    def authorized_to_update?(user)
      current_user.admin? || current_user.id == user.id
    end

    def render_not_found
      render json: { message: 'User not found' }, status: :not_found
    end

    def render_unauthorized
      render json: { message: "don't try to delete other people's accounts!" }, status: :unauthorized
    end

    def update_user(user)
      if user.update(user_params)
        render json: user, status: :ok
      else
        render json: user.errors, status: :unprocessable_entity
      end
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :phone_number, :password, :is_over_18)
    end

    def redirect_if_not_admin
      return if current_user.admin?

      render json: { message: 'You are not high enough to do that' },
             status: :unauthorized
    end
  end
end
