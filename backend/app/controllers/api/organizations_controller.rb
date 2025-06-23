module Api
  class OrganizationsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_organization, only: %i[show update destroy]
    before_action :redirect_if_not_superadmin, only: %i[index create]
    before_action :redirect_if_not_admin, only: %i[show update destroy]

    # GET /organizations or /organizations.json
    def index
      render json: Organization.where(soft_deleted: false).as_json, status: :ok
    end

    # GET /organizations/1 or /organizations/1.json
    def show
      return render json: @current_organization, status: :no_content if @current_organization.nil?

      render json: @current_organization.as_json, status: :ok
    end

    # POST /organizations or /organizations.json
    def create
      new_org = Organization.new(organization_params)

      if new_org.save
        # need to add current user as admin upon create
        # role_id = UserType.where(role: 'Admin').first.id
        # add_admin = UsersTypesTeam.new(user_id: current_user.id, organization_id: new_org.id, user_type_id: role_id)
        # if add_admin.save
        render json: new_org, status: :created
        # else
        #   render json: add_admin.errors, status: :unprocessable_entity
        # end
      else
        render json: new_org.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /organizations/1 or /organizations/1.json
    def update
      if @current_organization.update(organization_params)
        render json: @current_organization, status: :ok
      else
        render json: @current_organization.errors, status: :unprocessable_entity
      end
    end

    # DELETE /organizations/1 or /organizations/1.json
    def destroy
      @current_organization.delete

      render json: @current_organization, status: :accepted
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @current_organization = Organization.where(soft_deleted: false).where(id: params[:org_id]).first

      render json: { message: 'Organization not found' }, status: :not_found if @current_organization.nil?
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:name)
    end

    def redirect_if_not_admin
      return if current_user.admin?(@current_organization.id)

      render json: { message: 'You are not high enough to do that' }, status: :unauthorized
    end

    def redirect_if_not_superadmin
      return if current_user.superadmin?

      render json: { message: 'You are not high enough to do that' }, status: :unauthorized
    end
  end
end
