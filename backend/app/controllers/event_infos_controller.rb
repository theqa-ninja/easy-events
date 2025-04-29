class EventInfosController < ApplicationController
  before_action :set_permissions
  before_action :redirect_if_not_admin, only: %i[ signups check_ins edit update destroy ]
  before_action :set_event_info, only: %i[ show signup signups check_ins edit update destroy ]

  # GET /event_infos or /event_infos.json
  def index
    render json: EventInfo.all.as_json, status: :ok
  end

  # GET /event_infos/1 or /event_infos/1.json
  def show
    render json: @event_info.as_json, status: :ok
  end

  # GET /event_info/1/signup
  def signup
  end

  # GET /event_info/1/signups
  def signups
    @signups_over_18 = Signup.where(event_id: @event_info.id, user_is_over_18: true).order(:user_name)
    @signups_under_18 = Signup.where(event_id: @event_info.id, user_is_over_18: false).order(:user_name)
    render json: { signups_over_18: @signups_over_18.as_json, signups_under_18: @signups_under_18.as_json }, status: :ok
  end

  # GET /event_info/1/check-ins
  def check_ins
    @signups_over_18 = Signup.where(event_id: @event_info.id, user_is_over_18: true).order(:user_name)
    @signups_under_18 = Signup.where(event_id: @event_info.id, user_is_over_18: false).order(:user_name)
    render json: { signups_over_18: @signups_over_18.as_json, signups_under_18: @signups_under_18.as_json }, status: :ok
  end

  # don't think we're using this... pretty sure it was auto-generated
  # # GET /event_infos/new
  # def new
  #   @event_info = EventInfo.new
  #   render json: @event_info, status: :ok
  # end

  # GET /event_infos/1/edit
  def edit
  end

  # POST /event_infos or /event_infos.json
  def create
    @event_info = EventInfo.new(event_info_params)
    if @event_info.save
      render json: @event_info, status: :created
    else
      render json: @event_info.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /event_infos/1 or /event_infos/1.json
  def update
    if @event_info.update(event_info_params)
      render json: @event_info, status: :ok
    else
      render json: @event_info.errors, status: :unprocessable_entity
    end
  end

  # DELETE /event_infos/1 or /event_infos/1.json
  def destroy
    @event_info.destroy!

    render json: @event_info, status: :accepted
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event_info
      @event_info = EventInfo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_info_params
      params.require(:event_info).permit(:title, :start_time, :end_time, :team_id, :creator_id, :description, :adult_slots, :teenager_slots)
    end

    def set_permissions
      @user_is_event_coordenator_or_admin = current_user && UsersTypesTeam.find_by(user_id: current_user.id)
    end

    def redirect_if_not_admin
      redirect_to event_infos_path if !@user_is_event_coordenator_or_admin
    end
end
