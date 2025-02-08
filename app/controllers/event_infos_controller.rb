class EventInfosController < ApplicationController
  before_action :set_event_info, only: %i[ show edit update destroy ]

  # GET /event_infos or /event_infos.json
  def index
    @event_infos = EventInfo.all
  end

  # GET /event_infos/1 or /event_infos/1.json
  def show
  end

  # GET /event_infos/new
  def new
    @event_info = EventInfo.new
  end

  # GET /event_infos/1/edit
  def edit
  end

  # POST /event_infos or /event_infos.json
  def create
    @event_info = EventInfo.new(event_info_params)

    respond_to do |format|
      if @event_info.save
        format.html { redirect_to @event_info, notice: "Event info was successfully created." }
        format.json { render :show, status: :created, location: @event_info }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @event_info.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /event_infos/1 or /event_infos/1.json
  def update
    respond_to do |format|
      if @event_info.update(event_info_params)
        format.html { redirect_to @event_info, notice: "Event info was successfully updated." }
        format.json { render :show, status: :ok, location: @event_info }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @event_info.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /event_infos/1 or /event_infos/1.json
  def destroy
    @event_info.destroy!

    respond_to do |format|
      format.html { redirect_to event_infos_path, status: :see_other, notice: "Event info was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event_info
      @event_info = EventInfo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_info_params
      params.require(:event_info).permit(:title, :date, :start_time, :end_time, :description, :adult_signup_slots, :teenager_slots)
    end
end
