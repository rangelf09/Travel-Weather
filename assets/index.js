
// button to search
function searchWeather () {
    var apiKey = "c95e9c9171f928b48494c0f3b0126e89";

   let dataCity = document.querySelector("#search input").value;

   let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + dataCity + "&appid=" + apiKey;
   fetch(weather)
   .then(function(response){
    if(response.ok) {
        response.json()
        .then(function(data) {
            let lat = (data.coord.lat);
            let lon = (data.coord.long);
            let dt = (data.dt)
        });
    } else {
        alert("error");
    }
   });
};