<div id="search_wrap">
  <div class="top_bar_search">
    <h4>Find your new home</h4>
  </div>
  <form action="search.php" method="get" onsubmit="map_result_wrap()">
    <input id="address" class="address_entry" type="text" placeholder="Enter your postcode/location/town" name="location" required>
    <select id="radius" name="radius" class="radius_entry" required>
      <option value="" disabled selected>Radius</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="25">25</option>
      <option value="50">50</option>
    </select>
    <select id="bedroom_number" class="bed_entry" name="bedroom_number" required>
      <option value="" disabled selected>Min Bedrooms</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
      <option value="4">Four</option>
      <option value="5">Five</option>
      <option value="6">Six</option>
    </select>
    <button id="map_search" class="submitter_maps" type="submit" value="">
      <img src="library/images/search_icon.png">
    </button>
  </form>
</div>
