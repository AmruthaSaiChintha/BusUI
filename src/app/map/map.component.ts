// map.component.ts
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  sourceLat = 19.7515;
  sourceLng = 74.4763;
  destLat = 14.6546;
  destLng = 77.5561;
  centerLat = (this.sourceLat + this.destLat) / 2;
  centerLng = (this.sourceLng + this.destLng) / 2;
  routePath: any[] = []; // Array to store the route coordinates

  constructor(private mapsAPILoader: MapsAPILoader) {}

  ngOnInit() {
    // Load the Google Maps API and set up the Directions Service
    this.mapsAPILoader.load().then(() => {
      const directionsService = new google.maps.DirectionsService();

      // Define the origin and destination for the directions request
      const origin = new google.maps.LatLng(this.sourceLat, this.sourceLng);
      const destination = new google.maps.LatLng(this.destLat, this.destLng);

      // Create a directions request object
      const directionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      // Request directions from the Directions Service
      directionsService.route(directionsRequest, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          // Extract the route path from the response
          const route = response.routes[0].overview_path;

          // Convert the route path to an array of LatLng objects
          for (let i = 0; i < route.length; i++) {
            this.routePath.push({ lat: route[i].lat(), lng: route[i].lng() });
          }
        } else {
          console.error('Directions request failed with status: ' + status);
        }
      });
    });
  }
}
