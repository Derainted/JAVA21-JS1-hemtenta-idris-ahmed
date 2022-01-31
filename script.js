// API KEY from weatherbit
const ApiKey = 'c1c4af77918e44868e817addd7d61659';

let desc = document.querySelector("#current-description");
let temperature = document.querySelector("#current-temp");
let wind = document.querySelector("#current-wind");
let humidity = document.querySelector("#current-humidity");

// Getting button, input other data from html.
const input = document.querySelector("input");
const btn = document.querySelector("button");
const current_icon = document.querySelector("#current-weather-img")
const errorH4 = document.querySelector("h4");
const weather_forecast = document.querySelectorAll("#forecast-weather");

// Eventlistner to click on search button, Forecast is included.
btn.addEventListener("click", function (event) {
    getWeather();
    getWeatherForecast();
})

// Function for getting current weather
// Embing the api and fetching data and response.
function getWeather() {

    const url = `https://api.weatherbit.io/v2.0/current?&city=${input.value}&key=${ApiKey}&lang=sv`;

    fetch(url).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Something went wrong. Please write correct city name.';
            }
        }
    ).then(
        function (data) {
            console.log(data);

            // Data from json
            const { temp, wind_spd, rh } = data.data[0]
            const { description, icon } = data.data[0].weather

            // Code for showing results in html page
            desc.innerText = description;
            temperature.innerText = Math.floor(temp) + "°C";
            wind.innerText = Math.floor(wind_spd) + " " + "Vind";
            humidity.innerText = Math.floor(rh) + " " + "Luftfuktighet";
            current_icon.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`;
        }
    ).catch(
        function (error) {
            console.log(error);
            // Error code incase something goes wrong or the user writes a wrong city name
            const p = document.createElement('p');
            p.innerHTML = "Sidan laddades inte, Försök igen eller ange rätt namn på stad.";
            document.body.appendChild(p);
            setTimeout(function () {
                p.parentNode.removeChild(p);
            }, 3000);
        }
    );
}

// Function for getting 5 days forecast
function getWeatherForecast() {

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${input.value}&key=${ApiKey}&lang=sv&days=6`;

    fetch(url).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Something went wrong. Please write correct city name.';
            }
        }
    ).then(
        function (data) {
            console.log(data);

            // data from json 
            const { temp } = data.data[0]
            const { description, icon } = data.data[0].weather

            // loop for showing results for 5 days into html
            for (let i = 0; i < weather_forecast[0].children.length; i++) {
                weather_forecast[0].children[i].children[0].src = `https://www.weatherbit.io/static/img/icons/${data.data[i+1].weather.icon}.png`;
                weather_forecast[0].children[i].children[1].innerText = data.data[i+1].weather.description;
                weather_forecast[0].children[i].children[2].innerText = Math.round(data.data[i+1].temp) + "°C";
            }
        }
    ).catch(
        function (error) {
            console.log(error);
        }
    );
}