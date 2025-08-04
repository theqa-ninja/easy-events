module Api
  class OrganizationsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_org, only: %i[show update destroy]
    before_action :redirect_if_no_create, only: %i[create]
    before_action :redirect_if_no_edit, only: %i[update destroy]
    before_action :redirect_if_no_view, only: %i[create show index update destroy]

    # GET /organizations
    def index
      render json: Organization.where(soft_deleted: false).as_json, status: :ok
    end

    # GET /organizations/1
    def show
      return render json: @current_organization, status: :no_content if @current_organization.nil?

      render json: @current_organization.as_json, status: :ok
    end

    # POST /organizations
    def create
      new_org = Organization.new(organization_params)

      if new_org.save
        render json: new_org, status: :created
      else
        render json: new_org.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /organizations/1
    def update
      if @current_organization.update(organization_params)
        render json: @current_organization, status: :ok
      else
        render json: @current_organization.errors, status: :unprocessable_entity
      end
    end

    # DELETE /organizations/1
    def destroy
      @current_organization.delete

      render json: @current_organization, status: :accepted
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_org
      @current_organization = Organization.where(soft_deleted: false).where(id: params[:org_id]).first

      render json: { message: 'Organization not found' }, status: :not_found if @current_organization.nil?
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:name)
    end

    def redirect_if_no_create
      return if current_user.check_permissions(nil, nil, [:CREATE_ORG])

      render json: { message: "You can't create organizations" }, status: :unauthorized
    end

    def redirect_if_no_edit
      return if current_user.check_permissions(@current_organization.id, nil, %i[EDIT_ORG CREATE_ORG])

      render json: { message: "You can't edit organizations" }, status: :unauthorized
    end

    def redirect_if_no_view
      return if current_user.check_permissions(@current_organization&.id, nil, %i[VIEW_ORG EDIT_ORG CREATE_ORG])

      render json: { message: "You can't view organizations" }, status: :unauthorized
    end
  end
end
