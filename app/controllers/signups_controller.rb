class SignupsController < ApplicationController
  before_action :set_signup, only: %i[ show edit update destroy ]

  # GET /signups or /signups.json
  def index
    @signups = Signup.all
  end

  # GET /signups/1 or /signups/1.json
  def show
  end

  # GET /signups/new
  def new
    @signup = Signup.new
  end

  # GET /signups/1/edit
  def edit
  end

  # POST /signups or /signups.json
  def create
    event_id = @event_id
    if current_user
      user_id = current_user.id
    else
      @user = User.new({
        name: params[:signup][:user_name], 
        email: params[:signup][:user_email],
        phone_number: params[:signup][:user_phone_number],
        is_over_18: params[:signup][:user_is_over_18]
      })
      if @user.save
        user_id = User.last.id
      end
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
    respond_to do |format|
      user_id = current_user.id
      if @signup.update(
        user_id: user_id, 
        event_id: params[:signup][:event_id], 
        notes: params[:signup][:notes],
        user_name: params[:signup][:user_name], 
        user_email: params[:signup][:user_email],
        user_phone_number: params[:signup][:user_phone_number],
        user_is_over_18: params[:signup][:user_is_over_18]
      )
        format.html { redirect_to @signup, notice: "Signup was successfully updated." }
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
    end

    # Only allow a list of trusted parameters through.
    def signup_params
      params.require(:signup).permit(:user_name, :user_email, :user_phone_number, :user_is_over_18, :event_id, :notes, :checked_in_at, :cancelled_at)
    end
end
