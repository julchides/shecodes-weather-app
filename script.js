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
minutes = minutes < 10 ? "0" + minutes : minutes;

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${days[now.getDay()]}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${
  months[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${now.getHours()}:${minutes}`;

// Weather API

let apiKey = "54fb77f49c427e0baa9e8baf21cebec9";

function showWeather(response) {
  // Change city name
  document.querySelector("#city-name").innerHTML = response.data.name;

  // Change temperature
  document.querySelector("#temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}º`;

  // Change other parameters
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
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
