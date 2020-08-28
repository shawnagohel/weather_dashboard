// TO DO : FIX Search history city weather 



//----------Displays Current Date using moment.js
               
const date = document.getElementById("dateToday");

const now = moment();
const humanReadable = now.format('MMMM Do YYYY');
dateToday.textContent = humanReadable;

function updateTime() {

const now = moment();
const humanReadable = now.format('MMMM Do YYYY');
dateToday.textContent = humanReadable;

}
setInterval(updateTime, 1000);
updateTime();

 // Fun with keys !

 var apikey = "1c3229788cb2233c0bc46cdf6e8b44ac";

 $.ajax({
     url: "https://api.openweathermap.org/data/2.5/weather",
     dataType: 'json',
     type: 'GET',
     data: {q:city, appid: apikey},
     
     success: function(data){
         console.log(data);
         // Converting degrees from Kelvin to F
         var tempDegrees = data.main.temp;
         var tempBritish = (tempDegrees - 273.15) * 9/5 + 32;
         tempBritish = Math.floor(tempBritish);
         

         //------------ Displays City Name
         var cityName = data.name;
                
         console.log("city name from api = " + cityName);
         
         var cityTitle = $("#cityTitle");
         $(cityTitle).html(cityName);

//-------------  Displays the Weather Symbol
         getIcon(data.weather[0].icon); 
         var icon = getIcon(data.weather[0].icon); 
         $("#weathersymbol").attr("src", icon);

//-------------  Links the Icon 
         function getIcon(icon){
             var link = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
             return link

         }

//-------------- Displays the Temperature of User's Current City
         var temp = $("#temperature")
         $(temp).html("Temperature: " + tempBritish + " " + "°F");

//-------------- Displays the Humidity of User's Current City
         var humid = "Humidity: " + data.main.humidity + "%";
         var humidity = $("#humidity");
         $(humidity).html(humid);

//-------------- Displays The Wind Speed of User's Curent City
         var wind = "Wind Speed: " + data.wind.speed + " " + "mph";
         var windSpeed = $("#windSpeed");
         $(windSpeed).html(wind);
         
//--------------- Displays the UV Index of the User's Current City                
              
              var lat = data.coord.lat;
              var lon = data.coord.lon;
              console.log("lat = "+ lat + " lon = " + lon);

              var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat  + "&lon=" + lon;
              
              console.log("uvi url = " + queryURLUV);
              
                 $.ajax({
                          url: queryURLUV,
                          method: 'GET'
                      }).then(function (data) {
                          $('#uvIndex').empty();
                          var uvlresults = data.value;
                          //create HTML for new div
                          var uvlEl = $("<button class='btn bg-success'>").text("UV Index: " + data.value);
                    
                          $('#uvIndex').html(uvlEl);
                  
                      });          
         
     }

 });

 
//---------------- Ajax call for 5 day forecast
 $.ajax({
     url: "https://api.openweathermap.org/data/2.5/forecast",
     dataType: 'json',
     type: 'GET',
     data: {q:city, appid: apikey},
     
     success: function(data){
         console.log(data);
 

         //---changing the format of the default date 
         function dateFormat(i){
             var date = data.list[i].dt_txt;
             var year = date.slice(0,4);
             var day = date.slice(5,7);
             var month = date.slice(8,10);

             var newDateFormat = day + "/" + month + "/" + year;
             console.log(newDateFormat);
             return newDateFormat;
         }