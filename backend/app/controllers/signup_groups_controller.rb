# frozen_string_literal: true

class SignupGroupsController < ApplicationController
  before_action :set_signup_group, only: %i[show edit update destroy]

  # GET /signup_groups or /signup_groups.json
  def index
    @signup_groups = SignupGroup.all
  end

  # GET /signup_groups/1 or /signup_groups/1.json
  def show; end

  # GET /signup_groups/new
  def new
    @signup_group = SignupGroup.new
  end

  # GET /signup_groups/1/edit
  def edit; end

  # POST /signup_groups or /signup_groups.json
  def create
    @signup_group = SignupGroup.new(signup_group_params)

    respond_to do |format|
      if @signup_group.save
        format.html { redirect_to @signup_group, notice: 'Signup group was successfully created.' }
        format.json { render :show, status: :created, location: @signup_group }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @signup_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /signup_groups/1 or /signup_groups/1.json
  def update
    respond_to do |format|
      if @signup_group.update(signup_group_params)
        format.html { redirect_to @signup_group, notice: 'Signup group was successfully updated.' }
        format.json { render :show, status: :ok, location: @signup_group }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @signup_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /signup_groups/1 or /signup_groups/1.json
  def destroy
    @signup_group.destroy!

    respond_to do |format|
      format.html do
        redirect_to signup_groups_path, status: :see_other, notice: 'Signup group was successfully destroyed.'
      end
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_signup_group
    @signup_group = SignupGroup.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def signup_group_params
    params.require(:signup_group).permit(:user_id, :group_name)
  end
end
