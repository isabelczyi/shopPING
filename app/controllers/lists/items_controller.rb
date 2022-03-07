class Lists::ItemsController < ApplicationController

  def new
    @list = List.find(params[:list_id])
    @item = Item.new
    authorize @item
    @item.locations.build
  end

  def create
    @item = Item.new(item_params)
    authorize @item

    @list = List.find(params[:list_id])

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
    @item.list = @list
    @item.locations = locations_array
    @item.user = current_user
    if @item.save
      redirect_to item_path(@item)
    else
      render :new
    end
  end
end
