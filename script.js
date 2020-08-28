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


//------------AJAX CALLS - one for current weather, one for the 5 day forecast, and one for uv index api

$(document).ready(function(){
    $("#searchBtn").click(function(){
        var city = $("#searchInput").val();

        console.log("city name = " + city);
        $("#cityHistory").append("<button>"+city+"</button>");
        


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

                
//--------------Start Day 1 ---->
                $("#day1").html(dateFormat(7));
                //Icon 1
                getIcon(data.list[4].weather[0].icon); 
                var icon = getIcon(data.list[4].weather[0].icon);
                $("#icon1").attr("src", icon);
                //Temp1
                $("#temp1").html(calculateAvgTemp);
                //Humidity 1
                $("#humid1").html(calculateAvgHum);


//--------------Temperature Average
                function calculateAvgTemp(){
                    let avgTemp = 0;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp);
                    }
                    var response = avgTemp/8;
                    var tempBritish = (response - 273.15) * 9/5 + 32;
                    tempBritish = Math.floor(tempBritish);
                    tempBritish = "Temp: " + tempBritish + "°F";
                    return tempBritish;
                }

//------------------Humidity Average

                function calculateAvgHum(){
                    let avgHum = 0;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }
              
//------------------Icon Linking
                function getIcon(icon){
                    var link = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    return link

                }


//--------------  Start Day 2 ----->
                $("#day2").html(dateFormat(15));
                //Icon 2
                getIcon(data.list[12].weather[0].icon); 
                var icon = getIcon(data.list[12].weather[0].icon);
                $("#icon2").attr("src", icon);
                //Temp 2
                $("#temp2").html(calculateAvgTemp2);


                function calculateAvgTemp2(){
                    let avgTemp = 8;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempBritish = (response - 273.15) * 9/5 + 32;
                    tempBritish = Math.floor(tempBritish);
                    tempBritish = "Temp: " + tempBritish + "°F";
                    return tempBritish;
                }

//--------------Humidity 2

                $("#humid2").html(calculateAvgHum2);

                function calculateAvgHum2(){
                    let avgHum = 8;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }



//--------------   Start Day 3 ---->
                $("#day3").html(dateFormat(23));
                //Icon 3
                getIcon(data.list[19].weather[0].icon); 
                var icon = getIcon(data.list[19].weather[0].icon);
                $("#icon3").attr("src", icon);
                //Temp 3
                $("#temp3").html(calculateAvgTemp3);


                function calculateAvgTemp3(){
                    let avgTemp = 16;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempBritish = (response - 273.15) * 9/5 + 32;
                    tempBritish = Math.floor(tempBritish);
                    tempBritish = "Temp: " + tempBritish + "°F";
                    return tempBritish;
                }

                //Humidity 3

                $("#humid3").html(calculateAvgHum3);

                function calculateAvgHum3(){
                    let avgHum = 16;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }


                // Start Day 4 ----->
                $("#day4").html(dateFormat(31));
                //Icon 4
                getIcon(data.list[28].weather[0].icon); 
                var icon = getIcon(data.list[28].weather[0].icon);
                $("#icon4").attr("src", icon);
                //Temp 4
                $("#temp4").html(calculateAvgTemp4);


                function calculateAvgTemp4(){
                    let avgTemp = 24;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempBritish = (response - 273.15) * 9/5 + 32;
                    tempBritish = Math.floor(tempBritish);
                    tempBritish = "Temp: " + tempBritish + "°F";
                    return tempBritish;
                }

                //Humidity 4

                $("#humid4").html(calculateAvgHum4);

                function calculateAvgHum4(){
                    let avgHum = 24;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }


                // Start Day 5 ---->
                $("#day5").html(dateFormat(39));
                //Icon 5
                getIcon(data.list[36].weather[0].icon); 
                var icon = getIcon(data.list[36].weather[0].icon);
                $("#icon5").attr("src", icon);
                //Temp 5
                $("#temp5").html(calculateAvgTemp5);


                function calculateAvgTemp5(){
                    let avgTemp = 32;
                    for (i = 0; i < 8; i++){
                    avgTemp += data.list[i].main.temp;
                    console.log(avgTemp)
                    }
                    var response = avgTemp/8;
                    var tempBritish = (response - 273.15) * 9/5 + 32;
                    tempBritish = Math.floor(tempBritish);
                    tempBritish = "Temp: " + tempBritish + "°F";
                    return tempBritish;
                }

                //Humidity 5

                $("#humid5").html(calculateAvgHum5);

                function calculateAvgHum5(){
                    let avgHum = 32;
                    for(i= 0; i< 8; i++){
                    avgHum += data.list[i].main.humidity;
                    console.log(avgHum);
                    }
                    var response = avgHum/8;
                    response = Math.floor(response);
                    response = "Humidity: " + response + "%"
                    return response;

                }


            }
            

        });

    });
});