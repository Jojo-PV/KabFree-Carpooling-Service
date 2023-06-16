let map;
let directionsRenderer;
let directionsService;

function initMap() {
    
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 12.972442, lng: 77.580643 },
    zoom: 12,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true,
  });

  const form = document.getElementById("route-form");
  form.addEventListener("submit", calculateRoute);
}

function calculateRoute(event) {
  event.preventDefault();

  const pickup = document.getElementById("pickup-input").value;
  const drop = document.getElementById("drop-input").value;

  const request = {
    origin: pickup,
    destination: drop,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, (response, status) => {
    print(status);
    if (status === google.maps.DirectionsStatus.OK) {
        
      directionsRenderer.setDirections(response);

      const markerOptions = {
        icon: {
          url: "https://maps.gstatic.com/mapfiles/ms/icons/blue-dot.png",
        },
      };

      const pickupMarker = new google.maps.Marker({
        position: response.routes[0].legs[0].start_location,
        map: map,
        ...markerOptions,
      });

      const dropMarker = new google.maps.Marker({
        position: response.routes[0].legs[0].end_location,
        map: map,
        ...markerOptions,
      });
    } else {
      console.error("Directions request failed due to " + status);
    }
  });
}

function redirect_to_ui()
{
  window.location.href = '/ui';
}
