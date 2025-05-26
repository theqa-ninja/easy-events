module Api
  module V1
    class EventsController < ApplicationController
      before_action :set_permissions
      before_action :redirect_if_not_admin, only: %i[ signups check_ins create update destroy ]
      before_action :set_event, only: %i[ show signups check_ins update destroy ]

      # GET /events or /events.json
      def index
        # @events = Event.all # for no API
        render json: Event.where(soft_deleted: false).sort_by(&:start_time).as_json, status: :ok
      end

      # GET /events/1 or /events/1.json
      def show
        return render json: @event, status: :no_content if @event.nil?
        render json: @event.as_json, status: :ok
      end

      # GET /events/1/signups
      def signups
        signups_over_18 = Signup.where(soft_deleted: false).where(event_id: @event.id, user_is_over_18: true).order(:user_name)
        signups_under_18 = Signup.where(soft_deleted: false).where(event_id: @event.id, user_is_over_18: false).order(:user_name)
        # @signups = Signup.where(event_id: @event.id).order(:user_name) # for no API
        render json: { adults: {filled: signups_over_18.length, signups: signups_over_18.as_json},
          under_18: {filled: signups_under_18.length, signups: signups_under_18.as_json}
        }, status: :ok
      end

      # GET /events/1/checkins
      def check_ins
        checkins_over_18 = Signup.where(event_id: @event.id, user_is_over_18: true).where.not(checked_in_at: nil).order(:user_name)
        checkins_under_18 = Signup.where(event_id: @event.id, user_is_over_18: false).where.not(checked_in_at: nil).order(:user_name)
        render json: { adults: checkins_over_18.as_json, under_18: checkins_under_18.as_json }, status: :ok
      end

      # POST /events or /events.json
      def create
        @event = Event.new(event_params)
        if @event.save
          render json: @event, status: :created
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /events/1 or /events/1.json
      def update
        if @event.update(event_params)
          render json: @event, status: :ok
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      # DELETE /events/1 or /events/1.json
      def destroy
        @event.delete

        render json: @event, status: :accepted
      end


      # POST /events/1/signup
      def create_signup
        # check if event is full
        curr_event = Event.find(params[:id])
        return render json: { message: 'Event not found' }, status: :not_found if curr_event.nil?
        if current_user.nil?
          # fill in from sign up info
          current_user = User.new
          current_user.email = params[:email]
          current_user.name = params[:name]
          current_user.is_over_18 = params[:is_over_18]
          current_user.phone_number = params[:phone_number]
        end

        # check if the event slots are full
        if current_user.is_over_18
          if curr_event.remaining_adult_slots === 0
            # unless they're admin/event coordinator return event is full
            return render json: { message: 'Sorry, this event has reached the maximum adult signups' }, status: :precondition_failed if !@user_is_event_coordinator_or_admin
          end
        else
          if curr_event.remaining_teenager_slots === 0
            # unless they're admin/event coordinator return event is full
            return render json: { message: 'Sorry, this event has reached the maximum teenager signups' }, status: :precondition_failed if !@user_is_event_coordinator_or_admin
          end
        end
        new_signup = Signup.new({
          user_id: current_user.id,
          event_id: curr_event.id,
          notes: params[:notes],
          user_name: current_user.name,
          user_email: current_user.email,
          user_phone_number: current_user.phone_number,
          user_is_over_18: current_user.is_over_18
        })

        if new_signup.save
          render json: new_signup, status: :created
        else
          render json: new_signup.errors, status: :unprocessable_entity
        end
      end

      # UPDATE /events/1/signup
      def update_signup
        # TODO
        # validate the user is the creator of the signup or admin
        # save the changes
        # return the updated signup
      end

      # DELETE /events/1/signup
      def destroy_signup
        # TODO
        # validate the user is the creator of the signup or admin
        # soft delete the signup
        # return the deleted signup
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_event
        @event = Event.where(soft_deleted: false).where(id: params[:id]).first
        render json: { message: 'Event not found' }, status: :not_found if @event.nil?
      end

      # Only allow a list of trusted parameters through.
      def event_params
        params.require(:event).permit(:title, :start_time, :end_time, :team_id, :creator_id, :description, :adult_slots, :teenager_slots)
      end

      def set_permissions
        # @user_is_event_coordinator_or_admin = true # uncomment to test authorized areas
        @user_is_event_coordinator_or_admin = current_user && UsersTypesTeam.find_by(user_id: current_user.id)
      end

      def redirect_if_not_admin
        render json: { message: 'You are not high enough to do that' }, status: :unauthorized if !@user_is_event_coordinator_or_admin
      end
    end
  end
end
