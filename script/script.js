let weather = {
  apiKey: "17c3465c8f9f042a38c8d671af86dbc4",
  fetchWeather: function (city, state) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        state +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((Response) => Response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, temp_max, temp_min, humidity } = data.main;
    const { speed } = data.wind;
    console.log(
      name,
      icon,
      description,
      temp,
      feels_like,
      temp_max,
      temp_min,
      speed
    );
    document.querySelector(".city").innerText = "Weather in " + name;
    let now = new Date();
    let date = document.querySelector(".date");
    date.innerText = dateBuilder(now);
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".feels_like").innerText =
      "Feels like: " + feels_like;

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Saint Paul, MN");

function dateBuilder(d) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
