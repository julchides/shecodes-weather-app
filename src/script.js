// Set current date and time

let now = new Date();

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

// Weather API

let apiKey = "54fb77f49c427e0baa9e8baf21cebec9";
let celsiusTemperature = null;

function showWeather(response) {
  console.log(response);
  // Change city name
  document.querySelector("#city-name").innerHTML = response.data.name;

  // Change temperature
  celsiusTemp = response.data.main.temp;
  document.querySelector("#current-temp-value").innerHTML = `${Math.round(
    celsiusTemp
  )}º`;

  // Change weather description

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;

  // Change weather icon
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

  document
    .querySelector("#current-weather-icon")
    .setAttribute("src", `./images/${iconName}.svg`);
  document
    .querySelector("#ccurrent-weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
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
