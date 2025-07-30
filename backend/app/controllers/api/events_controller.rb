module Api
  class EventsController < ApplicationController
    before_action :authenticate_user!, only: %i[create update destroy checkins]
    before_action :set_event, only: %i[show update destroy checkins signup]
    before_action :set_team, only: %i[create]
    before_action :redirect_if_no_create, only: %i[create]
    before_action :redirect_if_no_edit, only: %i[create update destroy checkins]

    # GET /events
    def index
      if params[:filter].present?
        events = Event.where('start_time < ?', Time.zone.now) if params[:filter] == 'past'
        events = Event.all if params[:filter] == 'all'
        events = Event.where('start_time >= ?', Time.zone.now) if params[:filter] == 'upcoming'
      else
        events = Event.where('start_time >= ?', Time.zone.now)
      end
      events = events.where(team_id: params[:team_id]) if params[:team_id].present?
      events = events.joins(:team).where("team.organization_id": params[:org_id]) if params[:org_id].present?
      events = events.sort_by(&:start_time)
      render json: events.as_json, status: :ok
    end

    # GET /events/1
    def show
      render json: @current_event.as_json, status: :ok
    end

    # GET /events/1/signup
    def signup
      signup = Signup.find_by(
        event_id: @current_event.id,
        email: current_user.email
      )
      return render_not_found if signup.nil?

      render json: signup, status: :ok if signup
    end

    # POST /events
    def create
      @current_event = Event.new(event_params.merge(creator_id: current_user.id))
      if @current_event.save
        render json: @current_event, status: :created
      else
        render json: @current_event.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /events/1
    def update
      if @current_event.update(event_params)
        render json: @current_event, status: :ok
      else
        render json: @current_event.errors, status: :unprocessable_entity
      end
    end

    # DELETE /events/1
    def destroy
      # return render_unauthorized unless authorized_to_modify_events

      @current_event.delete

      render json: @current_event, status: :accepted
    end

    # GET /events/1/checkins
    # Returns all checkins for the event
    def checkins
      adults = @current_event.checkins.where(is_over_18: true)
      teenagers = @current_event.checkins.where(is_over_18: false)
      render json: { adults: adults, teenagers: teenagers }, status: :ok
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    # def set_org
    #   @current_org = Organization.where(id: params[:org_id]).first
    #   render_not_found if @current_org.nil?
    # end

    def set_team
      @current_team = Team.where(id: params[:team_id]).first
      if @current_team.nil?
        render_not_found
      else
        @current_org = @current_team.organization
      end
    end

    def set_event
      @current_event = Event.where(id: params[:event_id]).first
      if @current_event.nil?
        render_not_found
      else
        @current_team = @current_event.team
        @current_org = @current_team.organization
      end
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:title, :start_time, :end_time, :team_id, :creator_id, :description,
                                    :adult_slots, :teenager_slots)
    end

    def render_not_found
      render json: { message: 'Event not found' }, status: :not_found
    end

    def redirect_if_no_create
      return if current_user.check_permissions(@current_org.id, nil, [:EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[CREATE_EVENT EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't create events" }, status: :unauthorized
    end

    def redirect_if_no_edit
      return if current_user.check_permissions(@current_org.id, nil, [:EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_EVENT CREATE_EVENT EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't edit events" }, status: :unauthorized
    end

    def redirect_if_no_view
      # everyone can view events, so no point in checking permissions here
    end
  end
end
