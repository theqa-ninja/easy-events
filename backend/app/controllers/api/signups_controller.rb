module Api
  class SignupsController < ApplicationController
    before_action :authenticate_user!, only: %i[index show update destroy]
    before_action :set_event
    before_action :set_signup, only: %i[show update destroy]
    before_action :redirect_if_no_view, only: %i[index update destroy]
    before_action :redirect_if_no_edit, only: %i[update destroy]

    # GET events/{event_id}/signups
    # when a lead / admin views the signups for an event
    def index
      adults = adult_signups
      teenagers = teenager_signups

      render json: { adults: adults, teenagers: teenagers }, status: :ok
    end

    # GET /signup/1
    def show
      render json: @current_signup, status: :ok
    end

    # POST /events/1/signup
    def create
      # create the temp user
      tmp_user ||= User.new(email: params[:email], name: params[:name], is_over_18: params[:is_over_18],
                            phone_number: params[:phone_number])

      return if check_if_full_or_admin(is_over_18: tmp_user.is_over_18)

      # if the event is not full, create the signup
      new_signup = Signup.new({
                                user_id: current_user&.id,
                                event_id: @current_event.id,
                                notes: params[:notes],
                                name: tmp_user.name,
                                email: tmp_user.email,
                                phone_number: tmp_user.phone_number,
                                is_over_18: tmp_user.is_over_18
                              })

      if new_signup.save
        sleep(2) # ensure all signups are created before sending the email
        signups = Signup.where(email: new_signup.email, event_id: @current_event.id).where.not(name: new_signup.name)
        SignupMailer.signup_confirmation(new_signup, signups, @current_event, request.domain).deliver_now if params[:primary_contact]
        render json: new_signup, status: :created
      else
        render json: new_signup.errors, status: :unprocessable_entity
      end
    end

    # UPDATE /events/1/signup/:signup_id
    def update
      if @current_signup.update(signup_params)
        render json: @current_signup, status: :ok
      else
        render json: @current_signup.errors, status: :unprocessable_entity
      end
    end

    # DELETE /events/1/signup/:signup_id
    def destroy
      @current_signup.delete
      render json: { message: "Signup for #{signup.email} deleted" }, status: :accepted
    end

    private

    def set_event
      @current_event = Event.where(soft_deleted: false).where(id: params[:event_id]).first

      if @current_event.nil?
        render json: { message: 'Event not found' }, status: :not_found
      else
        @current_team = @current_event.team
        @current_org = @current_team.organization
      end
    end

    def set_signup
      @current_signup = if params[:signup_id].nil?
                          Signup.where(soft_deleted: false).where(event_id: @current_event.id).where(user_id: current_user.id).first
                        else
                          Signup.where(soft_deleted: false).where(event_id: @current_event.id).where(id: params[:signup_id]).first
                        end

      render_not_found if @current_signup.nil?
    end

    def render_not_found
      render json: { message: 'Signup not found' }, status: :not_found
    end

    def render_unauthorized
      render json: { message: "don't try to mess with other people's signups!" }, status: :unauthorized
    end

    # Only allow a list of trusted parameters through.
    def signup_params
      params.require(:signup).permit(:name, :email, :phone_number, :is_over_18, :notes, :checked_in_at, :cancelled_at, :volunteer_role_id,
                                     :primary_contact)
    end

    # checks if the current user is the one who made the signup
    def current_user_for_signup?
      return false if @current_signup.nil? || current_user.nil?

      @current_signup.user_id == current_user.id
    end

    def redirect_if_no_view
      return if current_user_for_signup?

      # return if current_user.check_permissions(@current_org.id, nil, [:EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[VIEW_EVENT EDIT_EVENT CREATE_EVENT EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't view events" }, status: :unauthorized
    end

    def redirect_if_no_edit
      return if current_user_for_signup?

      # return if current_user.check_permissions(@current_org.id, nil, [:EDIT_ORG]) # check if org permissions first

      return if current_user.check_permissions(@current_org.id, @current_team.id, %i[EDIT_EVENT CREATE_EVENT EDIT_TEAM CREATE_TEAM])

      render json: { message: "You can't edit events" }, status: :unauthorized
    end

    def adult_signups
      signups = Signup.where(soft_deleted: false).where(event_id: @current_event.id)
      signups_over_18 = signups.where(is_over_18: true)
      { filled: signups_over_18.length, remaining: @current_event.remaining_adult_slots - signups_over_18.length, signups: signups_over_18.as_json }
    end

    def teenager_signups
      signups = Signup.where(soft_deleted: false).where(event_id: @current_event.id)
      signups_under_18 = signups.where(is_over_18: false)
      { filled: signups_under_18.length, remaining: @current_event.remaining_teenager_slots - signups_under_18.length,
        signups: signups_under_18.as_json }
    end

    def check_if_full_or_admin(is_over_18:)
      # check if the event slots are full
      if is_over_18
        if @current_event.remaining_adult_slots <= 0 && !@user_is_event_coordinator_or_admin
          # unless they're admin/event coordinator return event is full
          render json: { message: 'Sorry, this event has reached the maximum adult signups' },
                 status: :precondition_failed
        end
      elsif @current_event.remaining_teenager_slots <= 0 && !@user_is_event_coordinator_or_admin
        # unless they're admin/event coordinator return event is full
        render json: { message: 'Sorry, this event has reached the maximum teenager signups' },
               status: :precondition_failed
      end
    end
  end
end
