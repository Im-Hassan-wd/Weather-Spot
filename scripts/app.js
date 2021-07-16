const cityForm = document.querySelector('form');
const overview = document.querySelector('.weather');
const cityLocation = document.querySelector('.overview span');

const updateUI = (data) => {

  const cityDetails = data.cityDetails;
  const weather = data.weather;
  const yesterday = data.yesterday;
  const tomorrow = data.tomorrow;

  console.log(data);
  cityLocation.textContent = `${cityDetails.EnglishName}`;
  overview.innerHTML =`
    <div>
      <h4>Yesterday</h4>
      <img src="img/icons/${yesterday.WeatherIcon}.png" alt="">
      <div class="condition">
        <h4>${yesterday.WeatherText}</h4>
        <h4>${yesterday.Temperature.Metric.Value}&deg;C</h4>
      </div>
    </div>

    <div>
      <h4>Today</h4>
      <img src="img/icons/${weather.WeatherIcon}.png" alt="">
      <div class="condition">
        <h4>${weather.WeatherText}</h4>
        <h4>${weather.Temperature.Metric.Value}&deg;C</h4>
      </div>
    </div>
  `;

  let day = `
    <div>
      <h4>Tomorrow</h4>
      <img src="img/icons/${tomorrow.Day.Icon}.png" alt="">
      <div class="condition">
        <h4>${tomorrow.Day.IconPhrase}</h4>
        <h4>${tomorrow.Temperature.Maximum.Value}&deg;C</h4>
      </div>
    </div>
  `
  let night = `
    <div>
      <h4>Tomorrow</h4>
      <img src="img/icons/${tomorrow.Night.Icon}.png" alt="">
      <div class="condition">
        <h4>${tomorrow.Night.IconPhrase}</h4>
        <h4>${tomorrow.Temperature.Maximum.Value}&deg;C</h4>
      </div>
    </div>
    `;

  if(weather.IsDayTime) {
    overview.innerHTML += day;
  } else {
    overview.innerHTML += night;
  }

};

const updateCity = async (city) => {

  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  const yesterday = await getYesterday(cityDetails.Key);
  const tomorrow = await getTomorrow(cityDetails.Key);

  return { cityDetails, weather, yesterday, tomorrow};

};

cityForm.addEventListener('submit', e => {
  // prevent default action
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update UI with the city value
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
