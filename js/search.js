        // This example displays an address form, using the autocomplete feature
        // of the Google Places API to help users fill in the information.
      
        // This example requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      
      var placeSearch, autocomplete;
      var addr;
      $("#autocomplete").on("blur", function(e) {
        addr = $("#autocomplete").val();
        console.log(addr);
        getSearching();      
      });
        function getSearching() {
          var req = new XMLHttpRequest();
      
          req.open("get", 
                  "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=AIzaSyA9HZHTYPmZR1TUi4eXU4ILeF_1F37Flc4",
                   true);
      
          req.onload = function() { 
              var response = JSON.parse(this.responseText);
              if (response.status === "OK") {
                  var geo = response.results[0].geometry.location.lat +","+ response.results[0].geometry.location.lng;
                  console.log(geo);
                  getCity(geo);
                  getWeather(geo);
                  
      
              } else {
                  alert("找不到地區");
              }
      
          }
          req.send();
      }
      function getCity(geo) {
          var req = new XMLHttpRequest();
      
          req.open("get", 
                   "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geo + "&language=zh-TW&key=AIzaSyA9HZHTYPmZR1TUi4eXU4ILeF_1F37Flc4", 
                   true);
      
          req.onload = function() { 
              var response = JSON.parse(this.responseText);
              if (response.status === "OK") {
                  var resCity = response.results[0].address_components[4].short_name + response.results[0].address_components[3].short_name;
                  city.innerHTML = resCity;
                  // console.log(response.results[0].address_components[3]);
      
              } else {
                  alert("找不到地區");
              }
      
          }
          req.send();
      }   
      
      function getWeather(geo) {
          var req = new XMLHttpRequest();
          req.open(
              "get",
              "https://api.apixu.com/v1/forecast.json?key=9d91004f47c247c2a9d50535182703&q=" + geo + "&lang=zh_tw&days=4",
              true
          );
          req.onload = function() {
              let 
                  response = JSON.parse(this.responseText),
                  resWeather = response.current.condition.text,
                  resTemp = response.current.temp_c,
                  cuMax = response.forecast.forecastday[0].day.maxtemp_c,
                  cuMin = response.forecast.forecastday[0].day.mintemp_c,
                  code = response.current.condition.code;
      
              iconSwitch(response.current.condition.code, "#weather_board");
              iconSwitch(response.forecast.forecastday[1].day.condition.code, "#f_icon_1");
              iconSwitch(response.forecast.forecastday[2].day.condition.code, "#f_icon_2");
              iconSwitch(response.forecast.forecastday[3].day.condition.code, "#f_icon_3");
      
              showWeather(resWeather, resTemp, cuMin, cuMax);
              
              getTemp(1);
              getTemp(2);
              getTemp(3);
      
              getTheDate(1);
              getTheDate(2);
              getTheDate(3);
      
              function getTemp(i) {
                  document.querySelector("#f_min_" + i).innerText = Math.round(response.forecast.forecastday[i].day.mintemp_c);
                  document.querySelector("#f_max_" + i).innerText = Math.round(response.forecast.forecastday[i].day.maxtemp_c);
                  document.querySelector("#f_weather_" + i).innerText = response.forecast.forecastday[i].day.condition.text;
              }
          }
          req.send();
      }
      
        function initAutocomplete() {
          // Create the autocomplete object, restricting the search to geographical
          // location types.
          autocomplete = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
              {types: ['geocode']});
      
          // When the user selects an address from the dropdown, populate the address
          // fields in the form.
          autocomplete.addListener('place_changed', fillInAddress);
        }
      
        function fillInAddress() {
          // Get the place details from the autocomplete object.
          var place = autocomplete.getPlace();
      
      
        }
      
        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        function geolocate() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
              });
              autocomplete.setBounds(circle.getBounds());
            });
          }
        }