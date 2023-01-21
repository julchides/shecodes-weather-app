let apiKey = "15b6ba0523386a8a73b38b2440a74dea";

// Date and time

function showTime(timestamp) {
  let now = new Date(timestamp * 1000);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let minutes = now.getMinutes();
  let currentDay = document.querySelector("#current-day");
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");

  minutes = minutes < 10 ? "0" + minutes : minutes;
  currentDay.innerHTML = `${days[now.getDay()]}`;
  currentDate.innerHTML = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  currentTime.innerHTML = `${now.getHours()}:${minutes}`;
}

function showDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDay = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekDays[weekDay];
}

// Icon

function showIcon(idName, response) {
  let iconImg = document.querySelector(idName);
  let iconName = response.main.replace(/ /i, "-").toLowerCase();

  let mistNames = [
    "mist",
    "smoke",
    "haze",
    "dust",
    "fog",
    "sand",
    "ash",
    "squall",
    "tornado",
  ];
  if (mistNames.includes(iconName)) {
    iconName = "mist";
  }

  iconImg.setAttribute("src", `./images/${iconName}.svg`);
  iconImg.setAttribute("alt", response.description);
}

// Forecast

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let daysQty = 5;

  let forecastHTML = `<ul class="forecast-list">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < daysQty) {
      forecastHTML =
        forecastHTML +
        `
        <li class="forecast-list-item">
            <img
              class="forecast-list-icon"
              src=""
              alt=""
              id="forecast-list-icon-${index}"
            />
            <p class="forecast-day" id="forecast-day">${showDay(
              forecastDay.dt
            )}</p>
            <p class="forecast-temp-max" id="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}°</p>
            <p class="forecast-temp-min" id="forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}°</p>
          </li>
          `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;

  for (let i = 0; i < daysQty; i++) {
    showIcon(`#forecast-list-icon-${i}`, forecast[i].weather[0]);
  }
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

// Weather

function showWeather(response) {
  // Change time
  showTime(response.data.dt);
  showIcon("#current-weather-icon", response.data.weather[0]);
  getForecast(response.data.coord);

  // Change city weather

  let cityName = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#current-temp-value");
  let currentDescription = document.querySelector("#current-description");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind");

  celsiusTemp = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}º`;
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function showUserCity(userCity) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchUserCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#user-city").value;
  showUserCity(userCity);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchUserCity);

// Current Location

function showUserLocation(position) {
  let apiUrlUserLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlUserLocation).then(showWeather);
}

function getUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showUserLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getUserLocation);

// Default city

showUserCity("Mykolaiv");
