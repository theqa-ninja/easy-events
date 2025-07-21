module Api
  class EventsController < ApplicationController
    before_action :set_event, only: %i[show update destroy checkins]
    before_action :redirect_if_not_lead_or_admin, only: %i[update destroy checkins]

    # GET /events
    def index
      # @current_events = Event.all # for no API
      render json: Event.where(soft_deleted: false).sort_by(&:start_time).as_json, status: :ok
    end

    # GET /events/1
    def show
      return render json: @current_event, status: :no_content if @current_event.nil?

      render json: @current_event.as_json, status: :ok
    end

    # GET /events/1/signup
    def signup
      signup = Signup.find_by(
        event_id: @current_event.id,
        email: current_user.email
      )
      return render json: current_user, status: :not_found if signup.nil?

      render json: signup, status: :ok if signup
    end

    # POST /events
    def create
      return render_unauthorized unless authorized_to_modify_events(params[:team_id])

      creator_id = current_user.id
      @current_event = Event.new(event_params.merge(creator_id: creator_id))
      if @current_event.save
        render json: @current_event, status: :created
      else
        render json: @current_event.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /events/1
    def update
      return render_unauthorized unless authorized_to_modify_events

      if @current_event.update(event_params)
        render json: @current_event, status: :ok
      else
        render json: @current_event.errors, status: :unprocessable_entity
      end
    end

    # DELETE /events/1
    def destroy
      return render_unauthorized unless authorized_to_modify_events

      @current_event.delete

      render json: @current_event, status: :accepted
    end

    # GET /events/1/checkins
    # Returns all checkins for the event
    def checkins
      render json: { checkins: @current_event.checkins }, status: :ok
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @current_event = Event.where(soft_deleted: false).where(id: params[:event_id]).first
      render json: { message: 'Event not found' }, status: :not_found if @current_event.nil?

      nil if current_user.nil?
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.require(:event).permit(:title, :start_time, :end_time, :team_id, :creator_id, :description,
                                    :adult_slots, :teenager_slots)
    end

    def authorized_to_modify_events(team_id = nil)
      team_id = @current_event.team_id if team_id.nil? && @current_event.present?
      org_id = Team.find_by(id: team_id)&.organization_id
      current_user.admin?(org_id) || current_user.leader?(team_id) || current_user.id == @current_event.user_id
    end

    def redirect_if_not_lead_or_admin
      return if current_user.leader?(@current_event.team_id) || current_user.admin?(@current_event.team.organization_id)

      render json: { message: 'You are not high enough to do that' },
             status: :unauthorized
    end
  end
end
