<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <title>Radius Test | Google Maps Example</title>
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
  <link rel="stylesheet" type="text/css" href="library/css/style.css">
</head>
<?php
  // initialize function initialises the map and markers
  if (stripos($_SERVER['REQUEST_URI'], 'search.php')){
     echo '<body onload="initialize()">';
  }
  else{
     echo '<body>';
  }
?>
<header>
  <div class="container_wide">
    <div class="contact_deets">
      <nav>
        <a href="index.php">Home</a>
        <a href="search.php">Find a home</a>
      </nav>
    </div>
  </div>
</header>
