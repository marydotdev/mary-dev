<script>
// @ts-nocheck

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

  const weatherCodes = [
    {
      "Weather Code": 200,
      "Description": "thunderstorm with light rain",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 201,
      "Description": "thunderstorm with rain",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 202,
      "Description": "thunderstorm with heavy rain",
      "Icon": "ThunderyHeavyRain"
    },
    {
      "Weather Code": 210,
      "Description": "light thunderstorm",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 211,
      "Description": "thunderstorm",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 212,
      "Description": "heavy thunderstorm",
      "Icon": "ThunderyHeavyRain"
    },
    {
      "Weather Code": 221,
      "Description": "ragged thunderstorm",
      "Icon": "ThunderyHeavyRain"
    },
    {
      "Weather Code": 230,
      "Description": "thunderstorm with light drizzle",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 231,
      "Description": "thunderstorm with drizzle",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 232,
      "Description": "thunderstorm with heavy drizzle",
      "Icon": "ThunderyShowers"
    },
    {
      "Weather Code": 300,
      "Description": "light intensity drizzle",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 301,
      "Description": "drizzle",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 302,
      "Description": "heavy intensity drizzle",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 310,
      "Description": "light intensity drizzle rain",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 311,
      "Description": "drizzle rain",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 312,
      "Description": "heavy intensity drizzle rain",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 313,
      "Description": "shower rain and drizzle",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 314,
      "Description": "heavy shower rain and drizzle",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 321,
      "Description": "shower drizzle",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 500,
      "Description": "light rain",
      "Icon": "LightRain"
    },
    {
      "Weather Code": 501,
      "Description": "moderate rain",
      "Icon": "HeavyRain"
    },
    {
      "Weather Code": 502,
      "Description": "heavy intensity rain",
      "Icon": "HeavyRain"
    },
    {
      "Weather Code": 503,
      "Description": "very heavy rain",
      "Icon": "HeavyRain"
    },
    {
      "Weather Code": 504,
      "Description": "extreme rain",
      "Icon": "HeavyRain"
    },
    {
      "Weather Code": 511,
      "Description": "freezing rain",
      "Icon": "LightSleetShowers"
    },
    {
      "Weather Code": 520,
      "Description": "light intensity shower rain",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 521,
      "Description": "shower rain",
      "Icon": "LightShowers"
    },
    {
      "Weather Code": 522,
      "Description": "heavy intensity shower rain",
      "Icon": "HeavyShowers"
    },
    {
      "Weather Code": 531,
      "Description": "ragged shower rain",
      "Icon": "HeavyShowers"
    },
    {
      "Weather Code": 600,
      "Description": "light snow",
      "Icon": "LightSnow"
    },
    {
      "Weather Code": 601,
      "Description": "snow",
      "Icon": "LightSnow"
    },
    {
      "Weather Code": 602,
      "Description": "heavy snow",
      "Icon": "HeavySnow"
    },
    {
      "Weather Code": 611,
      "Description": "sleet",
      "Icon": "LightSleet"
    },
    {
      "Weather Code": 612,
      "Description": "light shower sleet",
      "Icon": "LightSleet"
    },
    {
      "Weather Code": 613,
      "Description": "shower sleet",
      "Icon": "LightSleet"
    },
    {
      "Weather Code": 615,
      "Description": "light rain and snow",
      "Icon": "LightSleet"
    },
    {
      "Weather Code": 616,
      "Description": "rain and snow",
      "Icon": "LightSleet"
    },
    {
      "Weather Code": 620,
      "Description": "light shower snow",
      "Icon": "LightSnowShowers"
    },
    {
      "Weather Code": 621,
      "Description": "shower snow",
      "Icon": "LightSnowShowers"
    },
    {
      "Weather Code": 622,
      "Description": "heavy shower snow",
      "Icon": "HeavySnowShowers"
    },
    {
      "Weather Code": 701,
      "Description": "mist",
      "Icon": "Fog"
    },
    {
      "Weather Code": 711,
      "Description": "smoke",
      "Icon": "Fog"
    },
    {
      "Weather Code": 721,
      "Description": "haze",
      "Icon": "Fog"
    },
    {
      "Weather Code": 731,
      "Description": "sand/dust whirls",
      "Icon": "Unknown"
    },
    {
      "Weather Code": 741,
      "Description": "fog",
      "Icon": "Fog"
    },
    {
      "Weather Code": 751,
      "Description": "sand",
      "Icon": "Unknown"
    },
    {
      "Weather Code": 761,
      "Description": "dust",
      "Icon": "Unknown"
    },
    {
      "Weather Code": 762,
      "Description": "volcanic ash",
      "Icon": "Unknown"
    },
    {
      "Weather Code": 771,
      "Description": "squalls",
      "Icon": "Unknown"
    },
    {
      "Weather Code": 781,
      "Description": "tornado",
      "Icon": "Unknown"
    },
    {
      "Weather Code": 800,
      "Description": "clear sky",
      "Icon": "Sunny"
    },
    {
      "Weather Code": 801,
      "Description": "few clouds: 11-25%",
      "Icon": "PartlyCloudy"
    },
    {
      "Weather Code": 802,
      "Description": "scattered clouds: 25-50%",
      "Icon": "Cloudy"
    },
    {
      "Weather Code": 803,
      "Description": "broken clouds: 51-84%",
      "Icon": "Cloudy"
    },
    {
      "Weather Code": 804,
      "Description": "overcast clouds: 85-100%",
      "Icon": "VeryCloudy"
    }
  ]

  const iconArt = {
      "Sunny": [
          "    \\   /    ",
          "     .-.     ",
          "  ― (   ) ―  ",
          "     `-’     ",
          "    /   \\    "
      ],
      "PartlyCloudy": [
          "   \\  /      ",
          " _ /\"\".-.    ",
          "   \\_(   ).  ",
          "   /(___(__) ",
          "             "
      ],
      "Cloudy": [
          "             ",
          "     .--.    ",
          "  .-(    ).  ",
          " (___.__)__) ",
          "             "
      ],
      "VeryCloudy": [
          "             ",
          "     .--.    ",
          "  .-(    ).  ",
          " (___.__)__) ",
          "             "
      ],
      "LightShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "     ‘ ‘ ‘ ‘ ",
          "    ‘ ‘ ‘ ‘  "
      ],
      "HeavyShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "   ‚‘‚‘‚‘‚‘  ",
          "   ‚’‚’‚’‚’  "
      ],
      "LightSnowShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "     *  *  * ",
          "    *  *  *  "
      ],
      "HeavySnowShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "    * * * *  ",
          "   * * * *   "
      ],
      "LightSleetShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "     ‘ * ‘   ",
          "    * ‘ *    "
      ],
      "ThunderyShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "    ⚡‘ ‘⚡‘ ‘ ",
          "    ‘ ‘ ‘ ‘  "
      ],
      "ThunderyHeavyRain": [
          "     .-.     ",
          "    (   ).   ",
          "   (___(__)  ",
          "  ‚‘⚡‘‚⚡‘‚‘ ",
          "  ‚’‚’⚡‚’‚’  "
      ],
      "ThunderySnowShowers": [
          " _`/\"\".-.    ",
          "  ,\\_(   ).  ",
          "   /(___(__) ",
          "     *⚡*⚡*  ",
          "    *  *  *  "
      ],
      "LightRain": [
          "     .-.     ",
          "    (   ).   ",
          "   (___(__)  ",
          "    ‘ ‘ ‘ ‘  ",
          "   ‘ ‘ ‘ ‘   "
      ],
      "HeavyRain": [
          "     .-.     ",
          "    (   ).   ",
          "   (___(__)  ",
          "  ‚‘‚‘‚‘‚‘   ",
          "  ‚’‚’‚’‚’   "
      ],
      "LightSnow": [
          "     .-.     ",
          "    (   ).   ",
          "   (___(__)  ",
          "    *  *  *  ",
          "   *  *  *   "
      ],
      "HeavySnow": [
          "     .-.     ",
          "    (   ).   ",
          "   (___(__)  ",
          "   * * * *   ",
          "  * * * *    "
      ],
      "LightSleet": [
          "     .-.     ",
          "    (   ).   ",
          "   (___(__)  ",
          "    ‘ * ‘ *  ",
          "   * ‘ *     "
      ],
      "Fog": [
          "             ",
          " _ - _ - _ - ",
          "  _ - _ - _  ",
          " _ - _ - _ - ",
          "             "
      ],
      "Unknown": [
          "    .-.      ",
          "     __)     ",
          "    (        ",
          "     `-’     ",
          "      •      "
      ]
  }

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
	<div class="w-full flex flex-col gap-2">
    <div class="flex justify-center items-end">
<pre class="w-fit leading-5">
{@html getIconArt(currentWeatherCode).join('\n')}
</pre>
    </div>
    <div class="flex justify-center items-center gap-4">
      <div>
        <p class="text-xl">{Math.round(weatherData.current.temp)}°F</p>
      </div>
      <div class="">
        <p>{weatherData.current.weather[0].main}</p>
        <p class="italic">{weatherData.current.weather[0].description}</p>
      </div>
    </div>
  </div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
</div>
