let apiKey = "54fb77f49c427e0baa9e8baf21cebec9";

// Set current date and time

function showTime(timestamp) {
  let now = new Date(timestamp);

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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let minutes = now.getMinutes();
  let currentDay = document.querySelector("#current-day");
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");

  minutes = minutes < 10 ? "0" + minutes : minutes;
  currentDay.innerHTML = `${days[now.getDay()]}`;
  currentDate.innerHTML = `${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()}`;
  currentTime.innerHTML = `${now.getHours()}:${minutes}`;
}

// Weather

function showWeather(response) {
  // Change time
  showTime(response.data.dt * 1000);

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

  // Change weather icon
  let iconImg = document.querySelector("#current-weather-icon");
  let iconName = response.data.weather[0].main.replace(/ /i, "-").toLowerCase();

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
  iconImg.setAttribute("alt", currentDescription);
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#current-temp-value").innerHTML =
    Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp-value").innerHTML =
    Math.round(celsiusTemp);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchUserCity);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

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
