module Api
  class OrganizersTypesController < ApplicationController
    before_action :authenticate_user!
    # before_action :redirect_if_no_create, only: %i[create]
    # before_action :redirect_if_no_edit, only: %i[update destroy]
    before_action :set_current_org_type, only: %i[show]
    before_action :redirect_if_no_edit, only: %i[assign_type]
    # before_action :redirect_if_no_view, only: %i[index show create update destroy]
    before_action :redirect_if_no_view, only: %i[index show]

    # GET /organizers_types
    def index
      @current_org_types = OrganizerType.all
      render json: @current_org_types
    end

    # GET /organizers_types/1
    def show
      render json: @current_org_type
    end

    # disabled the 3 methods below, no need to change at this time
    # POST /organizers_types
    # def create
    #   @current_org_type = OrganizerTypes.new(organizer_type_team_params)
    #   if @current_org_type.save
    #     render json: @current_org_type, status: :created
    #   else
    #     render json: @current_org_type.errors, status: :unprocessable_entity
    #   end
    # end

    # # PATCH/PUT /organizers_types/1
    # def update
    #   if @current_org_type.update(organizer_type_team_params)
    #     render json: @current_org_type, status: :ok
    #   else
    #     render json: @current_org_type.errors, status: :unprocessable_entity
    #   end
    # end

    # # DELETE /organizers_types/1
    # def destroy
    #   @current_org_type.destroy
    #   render json: { message: "User permission #{@current_org_type.name} deleted" }, status: :accepted
    # end

    def assign_type
      # check if organizer_type exists
      temp_organizers_types_org = OrganizerTypesOrgsTeam.new(organizer_type_org_team_params)
      organizers_types_org = OrganizerTypesOrgsTeam.find_by(user_id: temp_organizers_types_org.user_id,
                                                            organization_id: temp_organizers_types_org.organization_id,
                                                            team_id: temp_organizers_types_org.team_id)
      # check if current user has permission to assign to current org
      return render_unauthorized unless @current_user.check_permissions(temp_organizers_types_org.organization_id, temp_organizers_types_org.team_id,
                                                                        %i[EDIT_ORG]) # TODO: I can't remember if this limits by org or not though

      # check if org exists
      # check if team exists
      # check if user being assigned exists
      if organizers_types_org.nil?
        if temp_organizers_types_org.save
          render json: temp_organizers_types_org, status: :created
        else
          render json: temp_organizers_types_org.errors, status: :unprocessable_entity
        end
      elsif organizers_types_org.update(organizer_type_org_team_params)
        render json: organizers_types_org, status: :ok
      else
        render json: organizers_types_org.errors, status: :unprocessable_entity
      end
    end

    private

    def set_current_org_type
      @current_org_type = OrganizerType.find(params[:id])
      render_not_found if @current_org_type.nil?
    end

    def render_unauthorized
      render json: { message: "don't try to modify permissions if you don't have permission!" }, status: :unauthorized
    end

    def render_not_found
      render json: { message: 'User permission not found' }, status: :not_found
    end

    def redirect_if_no_create
      if current_user.check_permissions(nil, nil,
                                        %i[EDIT_ORG])
        return
      end

      render_unauthorized
      # return if current_user.check_permissions(@current_org.id, nil, %i[EDIT_ORG])

      # return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_TEAM CREATE_TEAM])

      # render json: { message: 'You do not have permission to create volunteer roles' }, status: :unauthorized
    end

    def redirect_if_no_edit
      if current_user.check_permissions(nil, nil,
                                        %i[EDIT_ORG])
        return
      end

      render_unauthorized
      #   # return if current_user.check_permissions(@current_org.id, nil, %i[EDIT_ORG])

      #   return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_TEAM CREATE_TEAM])

      #   render json: { message: 'You do not have permission to edit volunteer roles' }, status: :unauthorized
    end

    def redirect_if_no_view
      if current_user.check_permissions(nil, nil,
                                        %i[EDIT_ORG VIEW_ORG])
        return
      end

      render_unauthorized
      #   # return if current_user.check_permissions(@current_org.id, nil, %i[EDIT_ORG])

      #   return if current_user.check_permissions(@current_org.id, @current_team.id, %i[VIEW_TEAM EDIT_TEAM CREATE_TEAM])

      #   render json: { message: "You can't view volunteer roles" }, status: :unauthorized
    end

    # Only allow a list of trusted parameters through.
    def organizer_type_org_team_params
      params.require(:organizer_types_orgs_team).permit(:user_id, :organization_id, :team_id, :organizer_type_id)
    end
  end
end
