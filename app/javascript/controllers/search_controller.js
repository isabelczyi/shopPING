import { Controller } from "stimulus"
import mapboxgl from '!mapbox-gl';


export default class extends Controller {
  static targets = ["address", "location", "map"]

  connect() {
    console.log("Hello!");
  }

  mapAndMarkers(address) {
    // console.log(this.addressTarget.value); // gives us address
    const container_id = address.getAttribute('container-id')
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address.innerHTML}.json?access_token=pk.eyJ1IjoiaXNhYmVsY3p5aSIsImEiOiJja3pldjNvNWczY2x4MnZuZnpqdDdscGp3In0.iVjXI88mmlkiTMtHQvsPTg`)
      .then(response => response.json())
      .then((data) => {
        mapboxgl.accessToken = "pk.eyJ1IjoiaXNhYmVsY3p5aSIsImEiOiJja3pldjNvNWczY2x4MnZuZnpqdDdscGp3In0.iVjXI88mmlkiTMtHQvsPTg";
        const map = new mapboxgl.Map({
          container: String(container_id),
          style: "mapbox://styles/mapbox/streets-v9",
          center: [data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1]],
          zoom: 12
        });
        data.features.forEach((item) => {
          const longitude = item.geometry.coordinates[0];
          const latitude = item.geometry.coordinates[1];
          // create the popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            item.place_name // put geo url
          );
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(popup)
            .addTo(map);
        });
      });

  }

  searchLocation(event) {
    event.preventDefault();
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.addressTarget.value}.json?access_token=pk.eyJ1IjoiaXNhYmVsY3p5aSIsImEiOiJja3pldjNvNWczY2x4MnZuZnpqdDdscGp3In0.iVjXI88mmlkiTMtHQvsPTg`)
        .then(response => response.json())
        .then((data) => {
          mapboxgl.accessToken = "pk.eyJ1IjoiaXNhYmVsY3p5aSIsImEiOiJja3pldjNvNWczY2x4MnZuZnpqdDdscGp3In0.iVjXI88mmlkiTMtHQvsPTg";
          const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v9",
            center: [data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1]],
            zoom: 12
          });
          data.features.forEach((item) => {
            const longitude = item.geometry.coordinates[0];
            const latitude = item.geometry.coordinates[1];
            // create the popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
              item.place_name
            );
            new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .setPopup(popup)
              .addTo(map);
          });
          this.mapTarget.classList.remove("d-none")
        });
    }, 500)
  }

  showMap(event) {
    event.preventDefault();
    this.mapAndMarkers(this.locationTarget)
  }
}
