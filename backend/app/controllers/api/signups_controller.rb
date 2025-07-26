module Api
  class SignupsController < ApplicationController
    before_action :set_event
    before_action :authenticate_user!, only: %i[index show update destroy]
    before_action :redirect_if_not_lead, only: %i[index show]

    # GET events/{event_id}/signups
    # when a lead / admin views the signups for an event
    def index
      adults = adult_signups
      teenagers = teenager_signups

      render json: { adults: adults, teenagers: teenagers }, status: :ok
    end

    # # GET /signups/1
    # when a user / lead / admin views a signup
    def show
      signup = find_signup

      return render_not_found if signup.nil?

      return render_unauthorized unless authorized_to_modify_signup(signup)

      render json: signup, status: :ok
    end

    # POST /events/1/signup
    # rubocop:disable Metrics/AbcSize
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
    # rubocop:enable Metrics/AbcSize

    # UPDATE /events/1/signup/:signup_id
    def update
      signup = find_signup
      return render_not_found if signup.nil?

      return render_unauthorized unless authorized_to_modify_signup(signup)

      update_signup(signup)
    end

    # DELETE /events/1/signup/:signup_id
    def destroy
      signup = find_signup
      return render_not_found if signup.nil?

      return render_unauthorized unless authorized_to_modify_signup(signup)

      signup.delete
      render json: { message: "Signup for #{signup.email} deleted" }, status: :accepted
    end

    private

    def set_event
      @current_event = Event.where(soft_deleted: false).where(id: params[:event_id]).first
      render json: { message: 'Event not found' }, status: :not_found if @current_event.nil?
    end

    def find_signup
      if params[:signup_id].blank?
        Signup.where(soft_deleted: false).find_by(user_id: current_user.id, event_id: @current_event.id)
      else
        Signup.where(soft_deleted: false).find_by(id: params[:signup_id])
      end
    end

    def authorized_to_modify_signup(signup)
      current_user.event_leader?(@current_event.team_id)
    end

    def render_not_found
      render json: { message: 'Signup not found' }, status: :not_found
    end

    def render_unauthorized
      render json: { message: "don't try to mess with other people's signups!" }, status: :unauthorized
    end

    def update_signup(signup)
      if signup.update(signup_params)
        render json: signup, status: :ok
      else
        render json: signup.errors, status: :unprocessable_entity
      end
    end

    # Only allow a list of trusted parameters through.
    def signup_params
      params.require(:signup).permit(:name, :email, :phone_number, :is_over_18, :notes, :checked_in_at, :cancelled_at, :volunteer_role_id,
                                     :primary_contact)
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

    def redirect_if_not_lead
      return if current_user.event_leader?(@current_event.team_id)

      render json: { message: 'You are not high enough to do that' },
             status: :unauthorized
    end
  end
end
