class SignupsController < ApplicationController
  # before_action :set_permissions
  # before_action :set_signup, only: %i[ show edit update destroy ]
  # before_action :check_if_admin, only: %i[ index ]

  # # GET /signups or /signups.json
  # def index
  #   byebug
  #   @signups = Signup.all
  # end

  # # GET /signups/1 or /signups/1.json
  # def show
  #   byebug
  # end

  # # GET /signups/1/edit
  # def edit
  # end

  # # POST /signups or /signups.json
  # def create
  #   if current_user
  #     user_id = current_user.id
  #   end

  #   @event = Event.where(soft_deleted: false).find(params[:signup][:event_id])
  #   teen_slots_full = @event.remaining_teenager_slots == "full"
  #   adult_slots_full = @event.remaining_adult_slots == "full"
  #   reported_as_adult = params[:signup][:user_is_over_18] == "true"
  #   if reported_as_adult && adult_slots_full
  #     redirect_to event_signup_path(@event.id), alert: "Sorry, this event has reached the maximum adult signups."
  #   elsif !reported_as_adult && teen_slots_full
  #     redirect_to event_signup_path(@event.id), alert: "Sorry, this event has reached the maximum teenager signups."
  #   else
  #     @signup = Signup.new({
  #       user_id: user_id,
  #       event_id: params[:signup][:event_id],
  #       notes: params[:signup][:notes],
  #       user_name: params[:signup][:user_name],
  #       user_email: params[:signup][:user_email],
  #       user_phone_number: params[:signup][:user_phone_number],
  #       user_is_over_18: params[:signup][:user_is_over_18]
  #     })
  #     respond_to do |format|
  #       if @signup.save
  #         format.html { redirect_to @signup, notice: "Signup was successfully created." }
  #         format.json { render :show, status: :created, location: @signup }
  #       else
  #         format.html { render :new, status: :unprocessable_entity }
  #         format.json { render json: @signup.errors, status: :unprocessable_entity }
  #       end
  #     end
  #   end

  # end

  # # PATCH/PUT /signups/1 or /signups/1.json
  # def update
  #   respond_to do |format|
  #     if @signup.update(
  #       notes: params[:signup][:notes] || @signup.notes,
  #       user_name: params[:signup][:user_name] || @signup.user_name,
  #       user_email: params[:signup][:user_email] || @signup.user_email,
  #       user_phone_number: params[:signup][:user_phone_number] || @signup.user_phone_number,
  #       user_is_over_18: params[:signup][:user_is_over_18] || @signup.user_is_over_18,
  #       checked_in_at: params[:signup][:checked_in_at],
  #       cancelled_at: params[:signup][:cancelled_at]
  #     )
  #       # If it's the check-ins page, we don't want to redirect them to another page
  #       if params[:signup][:checked_in_at]
  #         format.html { redirect_to event_check_ins_path(@signup.event_id), notice: "Signup was successfully updated." }
  #       # If it's volunteer notes, it goes in a different table,
  #       # and we don't want to redirect them to another page
  #       elsif params[:signup][:volunteer_notes]
  #         note_params = {
  #           author_id: current_user.id,
  #           signup_id: @signup.id
  #         }
  #         if @signup.user_id
  #           note_params.user_id = @signup.user_id
  #         end
  #         if @signup.volunteer_note
  #           @signup.volunteer_note.update(
  #             volunteer_notes: params[:signup][:volunteer_notes]
  #           )
  #         else
  #           note_params[:volunteer_notes] = params[:signup][:volunteer_notes]
  #           VolunteerNote.create!(note_params)
  #         end
  #         format.html { redirect_to event_check_ins_path(@signup.event_id), notice: "Note was successfully saved." }
  #       elsif params[:signup][:volunteer_role_id]
  #         @signup.update(volunteer_role_id: params[:signup][:volunteer_role_id])
  #         format.html { redirect_to event_check_ins_path(@signup.event_id), notice: "Role was successfully saved." }
  #       else
  #         format.html { redirect_to @signup, notice: "Try again." }
  #       end
  #       format.json { render :show, status: :ok, location: @signup }
  #     else
  #       format.html { render :edit, status: :unprocessable_entity }
  #       format.json { render json: @signup.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /signups/1 or /signups/1.json
  # def destroy
  #   @signup.destroy!

  #   respond_to do |format|
  #     format.html { redirect_to signups_path, status: :see_other, notice: "Signup was successfully destroyed." }
  #     format.json { head :no_content }
  #   end
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_signup
  #     @signup = Signup.find(params[:id])

  #     redirect_to events_path if !@user_is_event_coordinator_or_admin && @signup.user_id != current_user&.id
  #   end

  #   # Only allow a list of trusted parameters through.
  #   def signup_params
  #     params.require(:signup).permit(
  #       :user_name,
  #       :user_email,
  #       :user_phone_number,
  #       :user_is_over_18,
  #       :event_id,
  #       :notes,
  #       :volunteer_notes,
  #       :checked_in_at,
  #       :cancelled_at
  #     )
  #   end

  #   def set_permissions
  #     @user_is_event_coordinator_or_admin = current_user && UsersTypesTeam.find_by(user_id: current_user.id)
  #   end

  #   # Only allow event coordinators and admin users to view the index
  #   def check_if_admin
  #     if !@user_is_event_coordinator_or_admin
  #       redirect_to events_path
  #     end
  #   end
end
