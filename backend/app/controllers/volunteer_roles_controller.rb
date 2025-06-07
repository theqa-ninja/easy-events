# frozen_string_literal: true

class VolunteerRolesController < ApplicationController
  before_action :set_volunteer_role, only: %i[show edit update destroy]

  # GET /volunteer_roles or /volunteer_roles.json
  def index
    @volunteer_roles = VolunteerRole.all
  end

  # GET /volunteer_roles/1 or /volunteer_roles/1.json
  def show; end

  # GET /volunteer_roles/new
  def new
    @volunteer_role = VolunteerRole.new
  end

  # GET /volunteer_roles/1/edit
  def edit; end

  # POST /volunteer_roles or /volunteer_roles.json
  def create
    @volunteer_role = VolunteerRole.new(volunteer_role_params)

    respond_to do |format|
      if @volunteer_role.save
        format.html { redirect_to @volunteer_role, notice: 'Volunteer role was successfully created.' }
        format.json { render :show, status: :created, location: @volunteer_role }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @volunteer_role.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /volunteer_roles/1 or /volunteer_roles/1.json
  def update
    respond_to do |format|
      if @volunteer_role.update(volunteer_role_params)
        format.html { redirect_to @volunteer_role, notice: 'Volunteer role was successfully updated.' }
        format.json { render :show, status: :ok, location: @volunteer_role }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @volunteer_role.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /volunteer_roles/1 or /volunteer_roles/1.json
  def destroy
    @volunteer_role.destroy!

    respond_to do |format|
      format.html do
        redirect_to volunteer_roles_path, status: :see_other, notice: 'Volunteer role was successfully destroyed.'
      end
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_volunteer_role
    @volunteer_role = VolunteerRole.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def volunteer_role_params
    params.fetch(:volunteer_role, {})
  end
end
