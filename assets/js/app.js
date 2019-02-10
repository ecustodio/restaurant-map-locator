//var map;
//var directionsDisplay;
//var directionsService;
//var locations;
//
//function initMap() {
//	locations = [
//	    {lat: 10.313217, lng: 123.892189},
//	    {lat: 10.314915, lng: 123.892220},
//	    {lat: 10.310447, lng: 123.890796},
//	    {lat: 10.311073, lng: 123.891220}
//	]
//	
//	cebuLocation = {
//		lat: 10.307817, lng: 123.886622
//	}
//	
//	directionsDisplay = new google.maps.DirectionsRenderer();
//	directionsService = new google.maps.DirectionsService();
//	
//    map = new google.maps.Map(document.getElementById('map'), {
//      center: cebuLocation,
//      zoom: 12,
//      mapTypeId: 'roadmap'
//    });
//	
//    directionsDisplay.setMap(map);
//    
//	var contentString = '<div id="content">'+
//	    '<div id="siteNotice">'+
//	    '</div>'+
//	    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
//	    '<div id="bodyContent">'+
//	    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
//	    'sandstone rock formation in the southern part of the '+
//	    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
//	    'south west of the nearest large town, Alice Springs; 450&#160;km '+
//	    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
//	    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
//	    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
//	    'Aboriginal people of the area. It has many springs, waterholes, '+
//	    'rock caves and ancient paintings. Uluru is listed as a World '+
//	    'Heritage Site.</p>'+
//	    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
//	    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
//	    '(last visited June 22, 2009).</p>'+
//	    '</div>'+
//	    '</div>';
//	
//	var infowindow = new google.maps.InfoWindow({
//		content: contentString
//	});
//	
//	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//
//	var markers = locations.map(function(location, i) {
//		var marker = new google.maps.Marker({
//		    position: location,
//		    label: labels[i % labels.length],
//		    map: map,
//		    title: 'Uluru (Ayers Rock)'
//		 });
//	 
//		marker.addListener('click', function() {
//		    infowindow.open(map, marker);
//		});
//	   
//		return marker;
//	});
//
//	var markerCluster = new MarkerClusterer(map, markers,
//         {	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//	
//	calculateAndDisplayRoute(directionsService, directionsDisplay);
//}
//
//function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//    //var selectedMode = document.getElementById('mode').value;
//	var selectedMode = "DRIVING";
//    directionsService.route({
//      origin: {lat: 10.314468, lng: 123.890378},  // Haight.
//      destination: {lat: locations[2].lat, lng:  locations[2].lng},
//      travelMode: google.maps.TravelMode[selectedMode]
//    }, function(response, status) {
//      if (status == 'OK') {
//        directionsDisplay.setDirections(response);
//      } else {
//        window.alert('Directions request failed due to ' + status);
//      }
//    });
//  }
//
//function calcRoute(map) {
//  var start = new google.maps.LatLng(41.850033, -87.6500523);
//  var end = new google.maps.LatLng(37.3229978, -122.0321823);
//  var request = {
//    origin: start,
//    destination: end,
//    travelMode: 'DRIVING'
//  };
//
//  directionsService.route(request, function(response, status) {
//    if (status == 'OK') {
//      directionsDisplay.setDirections(response);
//    } else {
//      alert("directions request failed, status=" + status)
//    }
//  });
//}

var map;
var infoWindow;
var markers;
var markerCluster;
var currentLocation;
var directionsDisplay;
var directionsService;
var detailBox;

const mapStyle = [
  {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": 33
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2e5d4"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c5dac6"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c5c6c6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4d7c6"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fbfaf7"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#acbcc9"
      }
    ]
  }
];

function sanitizeHTML(strings) {
  const entities = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'};
  let result = strings[0];
  for (let i = 1; i < arguments.length; i++) {
    result += String(arguments[i]).replace(/[&<>'"]/g, (char) => {
      return entities[char];
    });
    result += strings[i];
  }
  return result;
}

function initMap() {
	const apiKey = 'API_KEY';
	infoWindow = new google.maps.InfoWindow();
	infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
	
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsService = new google.maps.DirectionsService();
	
	
	
	cebuLocation = {
		lat: 10.307817, lng: 123.886622
	}
	
	map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 5,
	    center: cebuLocation,
	    styles: mapStyle,
	    mapTypeControl: false
	});
	
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      currentLocation = {
    		  lat: position.coords.latitude,
    	      lng: position.coords.longitude
	      };
	      
	      infoWindow.setPosition(currentLocation);
	      infoWindow.setContent('You are here!');
	      infoWindow.open(map);
	      
	      let marker = new google.maps.Marker({
	    	  position: currentLocation,	
	    	  map : map
	      });
	      
	      map.setCenter(currentLocation);
	    }, function() {
	    	handleLocationError(true, infoWindow, map.getCenter());
	    });
	  } else {
		  handleLocationError(false, infoWindow, map.getCenter());
	  }
	
	map.data.loadGeoJson('/assets/json/restaurant.json', null, function(features) {
		markers = features.map(function(feature) {
		    let marker = new google.maps.Marker({
		    	position: feature.getGeometry().get(0),
		    	type: feature.getProperty('type'),
		    	icon: {
					url: `/assets/img/icon_${feature.getProperty('type')}.png`,
					scaledSize: new google.maps.Size(64, 64)
				}
		    });
	    
		    marker.addListener('click', event => {
		  	  const type = feature.getProperty('type');
		  	  const name = feature.getProperty('name');
		  	  const description = feature.getProperty('description');
		  	  const hours = feature.getProperty('hours');
		  	  const specialty = feature.getProperty('specialty');
		  	  const visitCount = feature.getProperty('visit_count');
		  	  const position = feature.getGeometry().get();
		  	  
		  	  const content = sanitizeHTML`
		  	      <img style="float:left; height:100px; width:200px; margin-top:30px" src="https://maps.googleapis.com/maps/api/streetview?size=350x120&location=${position.lat()},${position.lng()}&key=${apiKey}">
		  	      <div style="margin-left:220px; margin-bottom:20px;">
		  	        <h2>${name}</h2><p>${description}</p>
		  	        <p><b>Open:</b> ${hours}<br/></p>
		  	        <p><b>Specialties:</b> ${specialty}<br/></p>
		  	        <p><b>No. of times visited:</b> ${visitCount}<br/></p>
		  	      </div>
		  	      <div style="float:right;">
		  	      	<button id="btn_get_direction" onclick="showDirection(${position.lat()}, ${position.lng()})">Get Direction</button>
		  	      </div>
		  	    `;
	
		  	  infoWindow.setContent(content);
		  	  infoWindow.setPosition(position);
		  	  infoWindow.open(map);
		    });
		    
		    marker.addListener('visible_changed', event => {
		    	markerCluster[(marker.getVisible())?'addMarker':'removeMarker'](marker)
		    });

		    return marker;
		});
		
		markerCluster = new MarkerClusterer(map, markers,
			      {	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	});
	
	map.data.setMap(null);
	
	directionsDisplay.setMap(map);
	
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
	                      'Error: The Geolocation service failed.' :
	                  		'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

filterMarkers = function (type) {
	if (type.value !== "none") {
		for (i = 0; i < markers.length; i++) {
	        marker = markers[i];
	        if (marker.type === type.value) {
	            marker.setVisible(true);
	        } else {
	            marker.setVisible(false);
	        }
	        
	        if(directionsDisplay != null) {
	            directionsDisplay.setMap(null);
	            directionsDisplay = null;
	        }

	        directionsDisplay = new google.maps.DirectionsRenderer();
	        directionsDisplay.setMap(map);
	    }
	}
}

function showDirection(destinationLtd, destinationLng) {
	var selectedMode = "DRIVING";
	var destination = 
	directionsService.route({
		origin: currentLocation, 
		destination: {lat: destinationLtd, lng: destinationLng},
		travelMode: google.maps.TravelMode[selectedMode]
	}, function(response, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
		
		infoWindow.close();
	});
}