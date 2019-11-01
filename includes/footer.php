    <?php require('config/config.php');?>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=<?php echo $google_maps_api;?>&libraries=geometry,places"></script>
    <script src="library/js/scripts.min.js"></script>

    <script>
      jQuery("#address").val("<?php echo $_GET["location"]; ?>");
      jQuery("#radius").val("<?php echo $_GET["radius"]; ?>");
      jQuery("#bedroom_number").val("<?php echo $_GET["bedroom_number"]; ?>");
    </script>


  </body>
</html>
