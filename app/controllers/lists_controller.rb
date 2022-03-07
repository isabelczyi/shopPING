class ListsController < ApplicationController

  def index
    @lists = policy_scope(List).order(created_at: :desc)
  end

  def show
    @list = List.find(params[:id])
    authorize @list
  end

  def new
    @list = List.new
    authorize @list
  end

  def create
    @list = List.new(list_params)
    authorize @list
    @list.user = current_user
    if @list.save
      redirect_to list_path(@list)
    else
      render :new
    end

  end

  def edit
    @list = List.find(params[:id])
    authorize @list
  end

  def updated
    @list = List.find(params[:id])
    authorize @list
    @list.user = current_user
    if @list.update(list_params)
      redirect_to list_path(@list)
    else
      render :edit
    end
  end

  def destroy
    @list = List.find(params[:id])
    authorize @list
    @list.destroy

    redirect_to lists_path
  end

  private

  def list_params
   params.require(:list).permit(:name)
  end
end
