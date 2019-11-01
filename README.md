
# Google Maps Radius & Filter

Example of how you can use google API's to create a location search with a radius and support for filtering results based on bedroom number (in this example).

## APIS

The project runs off Google geocode and places  - you will need your own API key with these libraries for it to work. You'll find the API key setup in the config/config.php file.


## Installation

Download the repository, run node install for gulp and elixir support and run gulp watch.

```bash
npm install
```
```bash
gulp watch
```

## Usage

You can change the markers to where ever you want and the same with the information within them.  The lat lng is what produces the location on the map and the other details are used for info windows and corresponding feeds.

```javascript
 // dunham massey
 var lat = '53.393113';
 var lng = '-2.416661';
 var point = new google.maps.LatLng(lat,lng);
 var id = '55';
 var country = 'England';
 var bedrooms = 4;
 var html="<b>"+country+"</b><br>"+id+bedrooms;
 // create the marker < don't show if greater than input
 if(bedrooms <= bedroom_no) {
   var marker = createMarker(point,country+" "+id,html,bedrooms);
 }
```
## Styling
Its styled to a point but has been built more of a test project for google API so will need work and hasn't been mobile optimised.

## License
[MIT](https://choosealicense.com/licenses/mit)
