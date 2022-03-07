class ItemsController < ApplicationController

  def index
    @items = policy_scope(Item).order(created_at: :desc)
  end

  def show
    @item = Item.find(params[:id])
    authorize @item
  end

  def new
    @item = Item.new
    authorize @item
  end

  def create
    # @item = Item.new(item_params)
    # authorize @item
    # if @item.save
    #   redirect_to item_path(@item)
    # else
    #   render :new
    # end

  end

  def edit
    @item = item.find(params[:id])
    authorize @item
  end

  def updated
    @item = item.find(params[:id])
    authorize @item
    if @item.update(item_params)
      redirect_to item_path(@item)
    else
      render :edit
    end
  end

  def destroy
    @item = item.find(params[:id])
    authorize @item
    @item.destroy

    redirect_to items_path
  end

  private

  def item_params
   params.require(:item).permit(:name)
  end
end
