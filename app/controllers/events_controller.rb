class EventsController < ApplicationController
  before_action :set_permissions
  before_action :redirect_if_not_admin, only: %i[ signups check_ins edit update destroy ]
  before_action :set_event, only: %i[ show signup signups check_ins edit update destroy ]

  # GET /events or /events.json
  def index
    @events = Event.all
  end

  # GET /events/1 or /events/1.json
  def show
  end

  # GET /event/1/signup
  def signup
  end

  # GET /event/1/signups
  def signups
    @signups_over_18 = Signup.where(event_id: @event.id, user_is_over_18: true).order(:user_name)
    @signups_under_18 = Signup.where(event_id: @event.id, user_is_over_18: false).order(:user_name)
  end

  # GET /event/1/check-ins
  def check_ins
    @signups_over_18 = Signup.where(event_id: @event.id, user_is_over_18: true).order(:user_name)
    @signups_under_18 = Signup.where(event_id: @event.id, user_is_over_18: false).order(:user_name)
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.new(event_params)

    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: "Event info was successfully created." }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: "Event info was successfully updated." }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy!

    respond_to do |format|
      format.html { redirect_to events_path, status: :see_other, notice: "Event info was successfully destroyed." }
      format.json { head :no_content }
    end
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
      @user_is_event_coordenator_or_admin = current_user && UsersTypesTeam.find_by(user_id: current_user.id)
    end

    def redirect_if_not_admin
      redirect_to events_path if !@user_is_event_coordenator_or_admin
    end
end
