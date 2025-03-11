class SignupsController < ApplicationController
  before_action :set_permissions
  before_action :set_signup, only: %i[ show edit update destroy ]
  before_action :check_if_admin, only: %i[ index ]

  # GET /signups or /signups.json
  def index
    @signups = Signup.all
  end

  # GET /signups/1 or /signups/1.json
  def show
  end

  # GET /signups/1/edit
  def edit
  end

  # POST /signups or /signups.json
  def create
    if current_user
      user_id = current_user.id
    end
    @signup = Signup.new({
      user_id: user_id,
      event_id: params[:signup][:event_id],
      notes: params[:signup][:notes],
      user_name: params[:signup][:user_name],
      user_email: params[:signup][:user_email],
      user_phone_number: params[:signup][:user_phone_number],
      user_is_over_18: params[:signup][:user_is_over_18]
    })

    respond_to do |format|
      if @signup.save
        format.html { redirect_to @signup, notice: "Signup was successfully created." }
        format.json { render :show, status: :created, location: @signup }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @signup.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /signups/1 or /signups/1.json
  def update
    check_in_cancel = params[:signup][:check_in_cancel]
    if check_in_cancel
      key_value = check_in_cancel.split(" ")
      key = key_value[0]
      value = key_value[1]
      if key == "checked_in_at"
        checked_in_at = value
        cancelled_at = nil
      elsif key == "cancelled_at"
        cancelled_at = value
        checked_in_at = nil
      end
    else
      checked_in_at = @signup.checked_in_at
      cancelled_at = @signup.cancelled_at
    end

    respond_to do |format|
      if @signup.update(
        user_id: @signup.user_id,
        event_id: @signup.event_id,
        notes: params[:signup][:notes] || @signup.notes,
        user_name: params[:signup][:user_name] || @signup.user_name, 
        user_email: params[:signup][:user_email] || @signup.user_email,
        user_phone_number: params[:signup][:user_phone_number] || @signup.user_phone_number,
        user_is_over_18: params[:signup][:user_is_over_18] || @signup.user_is_over_18,
        checked_in_at: checked_in_at,
        cancelled_at: cancelled_at
      )
        if params[:signup][:is_check_in_form]
          format.html { redirect_to event_info_check_in_path(@signup.event_id), status: :ok, notice: "Signup was successfully updated." }
        else
          format.html { redirect_to @signup, notice: "Signup was successfully updated." }
        end
        format.json { render :show, status: :ok, location: @signup }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @signup.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /signups/1 or /signups/1.json
  def destroy
    @signup.destroy!

    respond_to do |format|
      format.html { redirect_to signups_path, status: :see_other, notice: "Signup was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_signup
      @signup = Signup.find(params[:id])
      
      redirect_to event_infos_path if !@user_is_event_coordenator_or_admin && @signup.user_id != current_user&.id
    end

    # Only allow a list of trusted parameters through.
    def signup_params
      params.require(:signup).permit(
        :user_name, 
        :user_email, 
        :user_phone_number, 
        :user_is_over_18, 
        :event_id, 
        :notes, 
        :checked_in_at, 
        :cancelled_at, 
        :check_in_cancel,
        :is_check_in_form
      )
    end

    def set_permissions
      @user_is_event_coordenator_or_admin = current_user && UsersTypesTeam.find_by(user_id: current_user.id)
    end

    # Only allow event coordinators and admin users to view the index
    def check_if_admin
      if !@user_is_event_coordenator_or_admin
        redirect_to event_infos_path
      end
    end
end
