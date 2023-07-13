<script>
// @ts-nocheck
  import { weatherCodes, iconArt } from '$lib/weatherData';

  let currentWeatherCode;
  let weatherData;

  let weather = updateCurrentWeatherCode()
  .then(({ weatherData, currentWeatherCode }) => {
    // Assign the values to the corresponding variables
    currentWeatherCode = currentWeatherCode;
    weatherData = weatherData;
  })
  .catch((error) => {
    console.error(error);
  });


  function getIconArt(weatherCode) {
    const matchingWeather = weatherCodes.find(
      (weather) => weather["Weather Code"] === weatherCode
    );
    if (matchingWeather) {
      const icon = matchingWeather.Icon;
      return iconArt[icon] || [];
    }
    return [];
  }

	async function getCurrentWeather() {
		const res = await fetch(
			`https://api.openweathermap.org/data/3.0/onecall?lat=40.7&lon=-73.3&units=imperial&exclude=minutely,hourly&appid=cdb2c36ab2ec9bb2a643f4cabb1f6ad2`
		);
		const data = await res.json();

		if (res.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

  async function updateCurrentWeatherCode() {
    weatherData = await getCurrentWeather();
    currentWeatherCode = weatherData.current.weather[0].id;

    // console.log(weatherData, currentWeatherCode)

    return { weatherData, currentWeatherCode };
  }

</script>

<div class="w-fit">
  {#await weather}
	<p>...fetching current weather</p>
{:then data}

<pre class="w-fit text-xs font-mono font-bold">
{@html getIconArt(currentWeatherCode).join('\n')}
</pre>

{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
</div>
