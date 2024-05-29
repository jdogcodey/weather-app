// Function to get weather from Weather API and add to an object for use on site
async function makeApiRequest(location) {
  try {
    let apiRequest = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=13a96caa1090421fa23203200242805&q=${location}&days=3&aqi=no&alerts=no`,
      { mode: "cors" }
    );
    if (!apiRequest.ok) {
      throw new Error(`HTTP error! status: ${apiRequest.status}`);
    }
    let apiData = await apiRequest.json();
    let locationObject = {
      location: apiData.location.name,
      region: apiData.location.region,
      current: {
        temp: apiData.current.temp_c,
        comment: apiData.current.condition.text,
        image: apiData.current.condition.icon,
        wind: apiData.current.wind_mph,
        windDir: apiData.current.wind_dir,
        precip: apiData.current.precip_mm,
        humidity: apiData.current.humidity,
        feelslike: apiData.current.feelslike_c,
      },
      dayOne: {
        date: apiData.forecast.forecastday[0].date,
        maxTemp: apiData.forecast.forecastday[0].day.maxtemp_c,
        minTemp: apiData.forecast.forecastday[0].day.mintemp_c,
        avgTemp: apiData.forecast.forecastday[0].day.avgtemp_c,
        maxWind: apiData.forecast.forecastday[0].day.maxwind_mph,
        willRain: apiData.forecast.forecastday[0].day.daily_chance_of_rain,
        comment: apiData.forecast.forecastday[0].day.condition.text,
        image: apiData.forecast.forecastday[0].day.condition.icon,
        sunrise: apiData.forecast.forecastday[0].astro.sunrise,
        sunset: apiData.forecast.forecastday[0].astro.sunset,
      },
      dayTwo: {
        date: apiData.forecast.forecastday[1].date,
        maxTemp: apiData.forecast.forecastday[1].day.maxtemp_c,
        minTemp: apiData.forecast.forecastday[1].day.mintemp_c,
        avgTemp: apiData.forecast.forecastday[1].day.avgtemp_c,
        maxWind: apiData.forecast.forecastday[1].day.maxwind_mph,
        willRain: apiData.forecast.forecastday[1].day.daily_chance_of_rain,
        comment: apiData.forecast.forecastday[1].day.condition.text,
        image: apiData.forecast.forecastday[1].day.condition.icon,
        sunrise: apiData.forecast.forecastday[1].astro.sunrise,
        sunset: apiData.forecast.forecastday[1].astro.sunset,
      },
      dayThree: {
        date: apiData.forecast.forecastday[2].date,
        maxTemp: apiData.forecast.forecastday[2].day.maxtemp_c,
        minTemp: apiData.forecast.forecastday[2].day.mintemp_c,
        avgTemp: apiData.forecast.forecastday[2].day.avgtemp_c,
        maxWind: apiData.forecast.forecastday[2].day.maxwind_mph,
        willRain: apiData.forecast.forecastday[2].day.daily_chance_of_rain,
        comment: apiData.forecast.forecastday[2].day.condition.text,
        image: apiData.forecast.forecastday[2].day.condition.icon,
        sunrise: apiData.forecast.forecastday[2].astro.sunrise,
        sunset: apiData.forecast.forecastday[2].astro.sunset,
      },
    };
    console.log(locationObject);
  } catch (error) {
    console.log("Error fetching data:" + error);
  }
}
