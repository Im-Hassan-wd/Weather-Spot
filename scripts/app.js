const cityForm = document.querySelector('form');
const overview = document.querySelector('.weather');
const cityLocation = document.querySelector('.overview span');

const updateUI = (data) => {

  const cityDetails = data.cityDetails;
  const weather = data.weather;

  console.log(data);
  cityLocation.textContent = `${cityDetails.EnglishName}`;
  overview.innerHTML =`
    <div>
      <h4>Yesterday</h4>
      <img src="" alt="">
      <div class="condition">
        <h4>Partly Sunny</h4>
        <h4>23&deg;C</h4>
      </div>
    </div>

    <div>
      <h4>Today</h4>
      <img src="img/icons/${weather.WeatherIcon}.svg" alt="">
      <div class="condition">
        <h4>${weather.WeatherText}</h4>
        <h4>${weather.Temperature.Metric.Value}&deg;C</h4>
      </div>
    </div>

    <div>
      <h4>Tomorrow</h4>
      <img src="" alt="">
      <div class="condition">
        <h4>Slight Rain</h4>
        <h4>23&deg;C</h4>
      </div>
    </div>
  `;

};

const updateCity = async (city) => {

  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather};

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
