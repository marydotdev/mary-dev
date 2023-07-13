<script>
  export let weatherData;

  let description = weatherData.current.weather[0].description;
  let temp = weatherData.current.temp;
</script>

<div>
  <p>{temp}</p>
  <p>{description}</p>
</div>
