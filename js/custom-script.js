$(document).ready(function(){
  var temp, units, icon, min, max;
  var geo_location = {};
  // Check whether the browser supports geolocation
  if(navigator.geolocation){
    // Try to get the current geolocation, and relay to either
    // succes or error function
    navigator.geolocation.getCurrentPosition(success,error);
  } 
  // If not - display an error
  else {
    alert("Geolocation is not supported :(");
  }
  
  // If the geolocation is obtained, set the geo_location variable
  function success(position) {
    geo_location.lat = position.coords.latitude;
    geo_location.lng = position.coords.longitude;
    
    // Store the weather-getting URL, and the API key, in variables
    var api_key = "1dce6561efb6be4a6730b9981b105f03";
    var api_URL = "http://api.openweathermap.org/data/2.5/weather?lat=" + geo_location.lat + "&lon=" + geo_location.lng + "&APPID=" + api_key;
    // Attempt to retrieve the weather info JSON from OWM
    $.getJSON(api_URL, null, function(result){
      console.log(result);
      $('#city-name').html(result.name);
      temp = (result.main.temp - 272.15).toFixed(0);
      units = 'ºC';
      icon = '<img src="http://openweathermap.org/img/w/' + result.weather[0].icon + '.png" />';
      $('#current-temperature').html(icon + temp + units);      
      $('#weather-description').html(result.weather[0].description);
      min = (result.main.temp_min-272.15).toFixed(0);
      max = (result.main.temp_max-272.15).toFixed(0);
      $('#min-max').html("Min: " + min + units + " | Max: " + max + units);
    });
  }  
  // If the geolocation cannot be obtained, pop an error message
  function error() {
    alert("Unable to determine your location ...");
  }
  
  $('#change-units').click(function(){
    if(units == 'ºF'){
      temp  = toCelcius(temp);
      max   = toCelcius(max);
      min   = toCelcius(min);
      units = 'ºC';
    } else {
      temp  = toFarenheit(temp);
      max   = toFarenheit(max);
      min   = toFarenheit(min);
      units = 'ºF';
    }
    $('#current-temperature').html(icon + ' ' + temp + units);
    $('#min-max').html("Min: " + min + units + " | Max: " + max + units);
  });
  
  function toCelcius(val){
    return ((val-32)*5/9).toFixed(0);
  }
  
  function toFarenheit(val){
    return ((val*9/5)+32).toFixed(0);
  }
  
});