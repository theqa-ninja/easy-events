module Api
  module V1
    class EventsController < ApplicationController
      before_action :set_permissions
      before_action :redirect_if_not_admin, only: %i[ signups check_ins edit update destroy ]
      before_action :set_event, only: %i[ show signup signups check_ins edit update destroy ]

      # GET /events or /events.json
      def index
        # comment out for now
        # render json: Event.all.as_json, status: :ok
        @events = Event.all
      end

      # GET /events/1 or /events/1.json
      def show
        # comment out for now
        # render json: @event.as_json, status: :ok
      end

      # GET /events/1/signup
      def signup
      end

      # GET /events/1/signups
      def signups
        # comment out for now
        # @signups_over_18 = Signup.where(event_id: @event.id, user_is_over_18: true).order(:user_name)
        # @signups_under_18 = Signup.where(event_id: @event.id, user_is_over_18: false).order(:user_name)
        # render json: { signups_over_18: @signups_over_18.as_json, signups_under_18: @signups_under_18.as_json }, status: :ok
        @signups = Signup.where(event_id: @event.id).order(:user_name)
      end

      # GET /events/1/check-ins
      def check_ins
        @signups_over_18 = Signup.where(event_id: @event.id, user_is_over_18: true).order(:user_name)
        @signups_under_18 = Signup.where(event_id: @event.id, user_is_over_18: false).order(:user_name)
        render json: { signups_over_18: @signups_over_18.as_json, signups_under_18: @signups_under_18.as_json }, status: :ok
      end

      # GET /events/1/edit
      def edit
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
        @event.destroy!

        render json: @event, status: :accepted
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_event
        @event = Event.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def event_params
        params.require(:event).permit(:title, :start_time, :end_time, :team_id, :creator_id, :description, :adult_slots, :teenager_slots)
      end

      def set_permissions
        @user_is_event_coordinator_or_admin = current_user && UsersTypesTeam.find_by(user_id: current_user.id)
      end

      def redirect_if_not_admin
        redirect_to events_path if !@user_is_event_coordinator_or_admin
      end
    end
  end
end