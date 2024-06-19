if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeatherData(`${latitude},${longitude}`);
  });
} else {
  console.log("GPS doesn't work");
}

let searchInput = document.getElementById("searchinput");
searchInput.addEventListener("input", function (e) {
  let searchValue = e.target.value;
  getWeatherData(searchValue);
});

async function getWeatherData(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=af6b9fb315af4ee1a91122333241506`
  );
  let data = await res.json();
  console.log(data);
  displaytoday(data);
  displaytom(data);
  displayAftertom(data);
}

function displaytoday(data) {
  let time = new Date(data.current.last_updated);
  let daytoday = time.getDate(); //day number
  let dayname = time.toLocaleString("en-us", { weekday: "long" }); //day name
  let monthname = time.toLocaleString("en-us", { month: "long" }); //month name
  let cityName = data.location.name;
  let countryName = data.location.country;

  dayName.innerHTML = dayname;
  date.innerHTML = `${daytoday} ${monthname}`;
  city.innerHTML = `${cityName} , ${countryName}`;
  temp.innerHTML = `${data.current.temp_c}`;
  imgtoday.setAttribute('src', `https:`+data.current.condition.icon);
  statustext.innerHTML = data.current.condition.text;
  humidty.innerHTML = `  ${data.current.humidity} %`;
  wind.innerHTML = `   ${data.current.wind_kph}  km/hr`;
  direction.innerHTML = `   ${data.current.wind_dir} `;
}


function displaytom({ forecast }) {
  tomorrowid.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString(
    "en-us",
    { weekday: "long" }
  );
  imgtom.setAttribute('src', `https:`+forecast.forecastday[1].day.condition.icon);

  maxtemp.innerHTML = forecast.forecastday[1].day.maxtemp_c;
  mintemp.innerHTML = forecast.forecastday[1].day.mintemp_c;
  tomstatus.innerHTML = forecast.forecastday[1].day.condition.text;
}


function displayAftertom({ forecast }) {
  thedayafter.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString(
    "en-us",
    { weekday: "long" }
  );

  imgthedayafter.setAttribute('src', `https:`+forecast.forecastday[2].day.condition.icon);

  maxTemperature.innerHTML = forecast.forecastday[2].day.maxtemp_c;
  minTemperature.innerHTML = forecast.forecastday[2].day.mintemp_c;
  s.innerHTML = forecast.forecastday[2].day.condition.text;
}
