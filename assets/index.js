
// button to search
function searchWeather () {
    var apiKey = "f9e3ef72f0eaeee2c3f8a3b8951dd135";

   let dataCity = document.querySelector("#search input").value;

   let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + dataCity + "&appid=" + apiKey;
   fetch(apiUrl)
   .then(function(response){
    if(response.ok) {
        response.json()
        .then(function(data) {
            let lat = (data.coord.lat);
            let lon = (data.coord.lon);
            let dt = (data.dt)
            weather(dataCity, dt, lat, lon, apiKey);
        });
    } else {
        alert("error");
    }
   });
};

function weather(dataCity, dt, lat, lon, apiKey) {
    let city = {
        today: {},
        forecast: {}
    };
    let oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&dt=" + dt + "&units=imperial&appid=" + apiKey;

// fetch weather specs
    fetch(oneCallApi).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                city.today = {
                    date: String(new Date(dt * 1000)),
                    // icon: dataCity.current.weather[0].icon,
                    temp: data.current.temp,
                    wind: data.current.wind_speed,
                    humidity: data.current.humidity
                };
                // for the week forecast
                for (i = 1; i < 6; i++) {
                    city.forecast[i] = {
                        date: String(new Date (data.daily[i].dt * 1000)),
                        icon: data.daily[i].weather[0].icon,
                        temp: data.daily[i].temp.day,
                        wind: data.daily[i].wind_speed,
                        humidity: data.daily[i].humidity
                    }
                }
                
                
                displayWeather(city)
            })
        }
    });
}

function displayWeather (city) {
    let dateEl = document.createElement('h2')
    dateEl.innerText =(city.today.date).substr(0, 10)
    document.getElementById("today").appendChild(dateEl)

    // let imageEl = document.createElement('img')
    // imageEl.src = namedCities[city].today.icon
    // dateEl.append(imageEl);

    let tempEl = document.createElement('h3')
    tempEl.innerText ="Temp: " + city.today.temp + " Fahrenheit"
    document.getElementById("today").appendChild(tempEl)

    let windEl = document.createElement('h3')
    windEl.innerText ="Wind: " + city.today.temp + " MPH"
    document.getElementById("today").appendChild(windEl)

    let humidityEl = document.createElement('h3')
    humidityEl.innerText ="Humidity: " + city.today.temp + " %"
    document.getElementById("today").appendChild(humidityEl)



    // forecast
 for (var i = 1; i < 6; i++) {
    let spanEl =  document.createElement ('span')
    spanEl.innerText = (city.forecast[i].date).substr(0, 10)
    document.querySelector(".day" + i).appendChild(spanEl)

    // let iconEl = document.createElement("img")
    // iconEl.src =(city.today.icon)
    // document.querySelector(".day" + i).appendChild(iconEl)

    let tempEl =  document.createElement ('span')
    tempEl.innerText = (city.forecast[i].temp + "Fahrenheit")
    document.querySelector(".day" + i).appendChild(tempEl)

    let windEl =  document.createElement ('span')
    windEl.innerText = (city.forecast[i].wind + "MPH")
    document.querySelector(".day" + i).appendChild(windEl)

    let humidityEl =  document.createElement ('span')
    humidityEl.innerText = (city.forecast[i].humidity + "%")
    document.querySelector(".day" + i).appendChild(humidityEl)

}
 }