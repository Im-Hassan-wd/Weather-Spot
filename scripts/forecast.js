const key = 'KuZih1xFTuoAuxgKiwPPwTy3ENtGcVq2';

// get weather infromation
const getWeather = async (id) => {

  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
}

//get Yesterday
const getYesterday = async (id) => {

  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}/historical/24?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[23];

}

// get tomorrow
const getTomorrow = async (id) => {

  const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  const query = `${id}?apikey=${key}&metric=${true}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data.DailyForecasts[1];

}


// get city infromation
const getCity = async (city) => {

  const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];

};
