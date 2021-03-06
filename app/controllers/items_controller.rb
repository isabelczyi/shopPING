require 'open-uri'
require 'json'

class ItemsController < ApplicationController

  skip_after_action :verify_authorized, only: :near

  def index
    @items = policy_scope(Item).where("user_id = '#{current_user.id}'").includes(:locations).order(created_at: :desc)
    @markers = @items.includes(:locations).map do |item|
      item.locations.map do |location|
        {
          lat: location.latitude,
          lng: location.longitude,
          info_window: render_to_string(partial: "info_window", locals: { location: location })
        }
      end
    end
  end

  def new
    @item = Item.new
    authorize @item
    @item.locations.build
    @item.list = List.new
  end

  def create
    # @item = Item.new(item_params)
    # @list = List.find(params[:list_id])
    @item = Item.new(item_params)
    authorize @item
    if !@item.list.nil?
      @item.list.user = current_user
      @item.list.save
    end
    if !@item.locations.empty?
      search_query = @item.locations.first.address.gsub(' ', '%20')
      url = "https://api.mapbox.com/geocoding/v5/mapbox.places/#{search_query}.json?access_token=pk.eyJ1IjoiaXNhYmVsY3p5aSIsImEiOiJja3pldjNvNWczY2x4MnZuZnpqdDdscGp3In0.iVjXI88mmlkiTMtHQvsPTg"
      data_serialized = URI.open(url).read
      data = JSON.parse(data_serialized)
      number_to_create = data["features"].count
      locations_array = []
      number_to_create.times do
        locations_array << Location.new(address: @item.locations.first.address)
      end
      locations_array.each_with_index do |location, index|
        location.longitude = data["features"][index]["geometry"]["coordinates"][0]
        location.latitude = data["features"][index]["geometry"]["coordinates"][1]
      end
      # if @item.list.exists?
      #   @item.list = @list
      @item.locations = locations_array
    end
    @item.user = current_user
    if @item.save
      redirect_to items_path
    else
      render :new
    end
  end

  def edit
    @item = Item.find(params[:id])
    authorize @item
  end


  def update
    @item = Item.find(params[:id])
    authorize @item
    if @item.update(item_params)
      search_query = item_params['locations_attributes']['0']['address'].gsub(' ', '%20')
      url = "https://api.mapbox.com/geocoding/v5/mapbox.places/#{search_query}.json?access_token=pk.eyJ1IjoiaXNhYmVsY3p5aSIsImEiOiJja3pldjNvNWczY2x4MnZuZnpqdDdscGp3In0.iVjXI88mmlkiTMtHQvsPTg"
      data_serialized = URI.open(url).read
      data = JSON.parse(data_serialized)
      number_to_create = data["features"].count
      locations_array = []
      number_to_create.times do
        locations_array << Location.new(address: item_params['locations_attributes']['0']['address'])
      end
      locations_array.each_with_index do |location, index|
        location.longitude = data["features"][index]["geometry"]["coordinates"][0]
        location.latitude = data["features"][index]["geometry"]["coordinates"][1]
      end
      @item.locations = locations_array
      redirect_to items_path(anchor: "item_#{@item.id}")
    else
      render :edit
    end
  end

  def destroy
    @item = Item.find(params[:id])
    authorize @item
    @item.destroy

    if @item.list_id?
      redirect_to  list_path(@item.list)
    else
      redirect_to items_path
    end
  end

  def completed_toggle
    @item = Item.find(params[:id])
    authorize @item
    @item.toggle! :completed
    @item.save

    respond_to do |format|
      # format.html  { redirect_to items_path(anchor: "#{@item.id}")}
      format.json  { render :json => @item }
    end
  end

  def near
    lat = params['lat']
    lon = params['lon']
    location_instances = current_user.locations.near([lat, lon], current_user.nearby_distance)
    item_instances = location_instances.map do |location|
      location.item
    end
    item_instances.select! { |item| item.completed == false }
    message = " "
    if item_instances.uniq.count == 1
      message = "#{item_instances.uniq[0].name} is nearby!"
      # flash.alert = message
    elsif item_instances.uniq.count > 1
      item_names = item_instances.uniq.map {|item| item.name}
      message = "#{item_names[0..-2].join(', ')} and #{item_names.last} are nearby!"
      # flash[:notice] = message
    end
    item_ids = item_instances.uniq.map { |item| item.id }
    item_ids_string = item_ids.join
    respond_to do |format|
      format.json {
        render :json => {message: message, item_exist: !item_instances.empty?, item_ids: item_ids_string }
      }
    end
  end

  private

  def item_params
   params.require(:item).permit(:name, :description, :list_id, locations_attributes: [:id, :address, :_destroy], list_attributes: [:id, :name])
  end
end
