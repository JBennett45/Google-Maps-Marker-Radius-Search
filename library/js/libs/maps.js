// rowContent = the result for each marker, gmarkers = markers
var rowContent = "";
var gmarkers = [];
// global vars
var map = null;
var circle = null;
var geocoder = new google.maps.Geocoder();
// Setup create amrker function to use with XML - pass through each info type you want to pull in later...
function createMarker(latlng,name,maintitle,html,bedrooms,address,price) {
  // content for infowindow
  var contentString =  '<strong>' + maintitle + '</strong><br><br>' +
                       '<span>Address:' + address +  '</span><br>' +
                       '<span>Bedrooms:' + maintitle + '</span><br>' +
                       '<p>' + html + '</p>';
  var marker = new google.maps.Marker({
     position: latlng,
     // map: map,
     title: name,
     maintitle: maintitle,
     bedrooms: bedrooms,
     address: address,
     price: price,
     xcontent: html,
     //name: name,
     zIndex: Math.round(latlng.lat()*-100000)<<5
  });
  google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(contentString);
     infowindow.open(map,marker);
   });
  // save the info we need to use later for the side_bar
  gmarkers.push(marker);
}
// Search.php will use the initialize function to cretae and build map
function initialize() {
  jQuery([document.documentElement, document.body]).animate({
       scrollTop: jQuery("#results_search").offset().top
   }, 1000);

  // remove "?" from query
  var query = location.search.substring(1);
  // split url arguments up via & to be able to cycle through all of them
  var pairs = query.split("&");
  for (var i=0; i<pairs.length; i++) {
  // separate the argument and value for two separate vars
  var pos = pairs[i].indexOf("=");
  var argname = pairs[i].substring(0,pos).toLowerCase();
  var value = pairs[i].substring(pos+1).toLowerCase();
    // process each possible argname  -  use unescape() to get rid of any spaces.
    if (argname == "radius") {
      document.getElementById("radius").value = unescape(value);
      codeAddress();
    }
    if (argname == "address") {
      document.getElementById("address").value = unescape(value);
      codeAddress();
    }
  }
  // create the map
  var myOptions = {
   zoom: 8,
   center: new google.maps.LatLng(53.481308,-2.242336),
   mapTypeControl: true,
   mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
   navigationControl: true,
   mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  // Read the XML data using function in download_xml.js - downloadURL()
  downloadUrl("markers.xml", function(doc) {
    var xmlDoc = xmlParse(doc);
    var markers = xmlDoc.documentElement.getElementsByTagName("marker");

    var bedroom_input = document.getElementById('bedroom_number').value;

    for (var i = 0; i < markers.length; i++) {
      // obtain the attribues of each marker
      var lat = parseFloat(markers[i].getAttribute("lat"));
      var lng = parseFloat(markers[i].getAttribute("lng"));
      var point = new google.maps.LatLng(lat,lng);
      var id = markers[i].getAttribute("id");

      var maintitle = markers[i].getAttribute("title");
      var bedroomsno = markers[i].getAttribute("bedrooms");
      var html= markers[i].getAttribute("content");
      var address = markers[i].getAttribute("address");
      var price = markers[i].getAttribute("price");
      // create the marker
      if(bedroom_input >= bedroomsno) {
        var marker = createMarker(point,id,maintitle,html,bedroomsno,address,price);
      }
    }
  });
}
// Create marker and information based on input
function codeAddress() {
  // get location of search
  var address = document.getElementById('address').value;
  // get radius of search
  var radius = parseInt(document.getElementById('radius').value, 10)*1000;
  geocoder.geocode( { 'address': address}, function(results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    map.setCenter(results[0].geometry.location);
    var searchCenter = results[0].geometry.location;
    if (circle) circle.setMap(null);
    circle = new google.maps.Circle({
      center:searchCenter,
      radius: radius,
      fillOpacity: 0.30,
      strokeColor: '#F7AE47',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#F7AE47",
      map: map
    });
    var bounds = new google.maps.LatLngBounds();
    var foundMarkers = 0;
    for (var i=0; i<gmarkers.length;i++) {
      if (google.maps.geometry.spherical.computeDistanceBetween(gmarkers[i].getPosition(),searchCenter) < radius) {
        // create content for feed
        var contentPop =  '<div class="itemWrapper">' +
                          '<div class="img_wrapper"></div>' +
                          '<div class="content_wrapper">' +
                          '<div class="bg_inner">' +
                          '<span>Development Found</span>' +
                          '<h3>' + gmarkers[i].maintitle + '</h3>' +
                          '<h4 class="location_title">' + gmarkers[i].address + '</h4>' +
                          '<h4 class="price_title">' + gmarkers[i].bedrooms + ' bed home from £' + gmarkers[i].price + '</h4>' +
                          '<p>' + gmarkers[i].xcontent + '</p>' +
                          '<a href="#" class="btn_ywllow_mre_brder">View development</a>' +
                          '</div>' +
                          '</div>' +
                          '</div>';
        bounds.extend(gmarkers[i].getPosition())
        // show marker if in radius
        gmarkers[i].setMap(map);
        // setup content
        rowContent += contentPop;
        foundMarkers++;
       } else {
         // remove marker if not found in radius
         gmarkers[i].setMap(null);
       }
     }
     // put the assembled side_bar_html contents into the side_bar div
     document.getElementById("found_results").innerHTML = rowContent;
   } else {
     alert('Geocode was not successful for the following reason: ' + status);
   }
 });
}
// Infowindow (onclick)
var infowindow = new google.maps.InfoWindow({
 size: new google.maps.Size(150,50)
});
// Autocomplete address field - resticted to UK
var input = document.getElementById('address');
var options = {
   componentRestrictions: {country: 'uk'}
};
autocomplete = new google.maps.places.Autocomplete(input,options);
