
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
            weather(dataCity, dt, lat, long, apiKey);
        });
    } else {
        alert("error");
    }
   });
};

function weather(dataCity, dt, lat, long, apiKey) {
    let city = {
        today: {},
        forecast: {}
    }

    let oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&dt=" + dt + "&units=imperial&appid=" + yekipa;
// fetch weather specs
    fetch(oneCallApi).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                city.today = {
                    data: String(new Date(dt * 1000)),
                    icon: dataCity.current.weather[0].icon,
                    temp: data.current.temp,
                    wind: data.current.wind_speed,
                    humidity: data.current.humidity
                };
                // for the week forecast
                for (i = 1; i < 6; i++) {
                    city.forecast[i] = {
                        dat: String(new Date (data.daily[i].dt * 1000)),
                        icon: data.daily[i].weather[0].icon,
                        temp: data.daily[i].temp.day,
                        wind: data.daily[i].wind_speed,
                        humidity: data.daily[i.humidity]
                    }
                }
                namedCities = city
                localStorage.setItems('namedCities', json.stringify(namedCities));

                displayWeather(namedCities)
            })
        }
    });
}