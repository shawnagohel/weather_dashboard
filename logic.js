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
         