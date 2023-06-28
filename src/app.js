function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }

        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}
function displayForecast (response) {
   
    let forecast = response.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;


    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
        forecastHTML = 
            forecastHTML + 
            `
                <div class="col-2">
                    <div class="weather-forecast-date">${formatday(forecastDay.daily.time)}</div>      
                    <img 
                    src="${forecastDay.data.daily[0].condition.icon_url}" 
                    alt="${forecastDay.data.daily.condition.icon}" 
                    width="42"
                    />
                    <div class="weather-forecast-temperatures">
                    <span class="weather-forecase-minimum">${Math.round(forecastDay.daily.temperature.minimum)}</span>° 
                    | <span class="weather-forecast-maximum">${Math.round(forecastDay.daily.temperature.maximum)}</span>°
                    </div>
                </div>
            `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
        console.log(forecastHTML);
   
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "040c3166574e3dftbd2oda29cab8383c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
  }

function displayTemperature(response) {

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.temperature.current

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = (response.data.city);
descriptionElement.innerHTML = (response.data.condition.description);
humidityElement.innerHTML = (response.data.temperature.humidity);
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.time*1000);

iconElement.setAttribute("src", response.data.condition.icon_url);
iconElement.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
    let apiKey = "040c3166574e3dftbd2oda29cab8383c";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = fahrenheitTemperature; 
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature)

search("Jutiapa")