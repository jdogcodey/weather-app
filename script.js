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
    return locationObject;
  } catch (error) {
    console.log("Error fetching data:" + error);
  }
}

function updateInnerHTML(element, content) {
  element.innerHTML = content;
}

function updateImageSrc(element, content) {
  element.style.backgroundImage = `url(${content})`;
}

async function updatePage(location) {
  try {
    updateBackgrounds(location);
    updateAllFields(location);
  } catch (error) {
    console.log(error);
  }
}

async function updateBackgrounds(location) {
  let locationObject = await makeApiRequest(`${location}`);
  let currentTile = document.getElementById("current-tile");
  let tile1 = document.getElementById("tile-1");
  let tile2 = document.getElementById("tile-2");
  let tile3 = document.getElementById("tile-3");
  updateImageSrc(currentTile, `https:${locationObject.current.image}`);
  updateImageSrc(tile1, `https:${locationObject.dayOne.image}`);
  updateImageSrc(tile2, `https:${locationObject.dayTwo.image}`);
  updateImageSrc(tile3, `https:${locationObject.dayThree.image}`);
}

async function updateAllFields(location) {
  let locationObject = await makeApiRequest(location);
  let currentTemp = document.getElementById("current-temp-number");
  let currentFeelsLike = document.getElementById("current-temp-feels-like");
  let currentWindNumber = document.getElementById("current-wind-number");
  let currentWindDirection = document.getElementById("current-wind-direction");
  let currentRainNumber = document.getElementById("current-rain-number");
  let currentHumidityNumber = document.getElementById(
    "current-humidity-number"
  );
  let currentLocation = document.getElementById("current-location");
  let currentRegion = document.getElementById("current-region");
  let currentComment = document.getElementById("current-comment");
  let dateOne = document.getElementById("1-date");
  let tempOne = document.getElementById("1-temp");
  let windOne = document.getElementById("1-wind");
  let rainPercOne = document.getElementById("1-rain-perc");
  let commentOne = document.getElementById("1-comment");
  let daylightOne = document.getElementById("1-daylight");
  let dateTwo = document.getElementById("2-date");
  let tempTwo = document.getElementById("2-temp");
  let windTwo = document.getElementById("2-wind");
  let rainPercTwo = document.getElementById("2-rain-perc");
  let commentTwo = document.getElementById("2-comment");
  let daylightTwo = document.getElementById("2-daylight");
  let dateThree = document.getElementById("3-date");
  let tempThree = document.getElementById("3-temp");
  let windThree = document.getElementById("3-wind");
  let rainPercThree = document.getElementById("3-rain-perc");
  let commentThree = document.getElementById("3-comment");
  let daylightThree = document.getElementById("3-daylight");
  updateInnerHTML(currentTemp, `${locationObject.current.temp}°`);
  updateInnerHTML(currentFeelsLike, `${locationObject.current.feelslike}°`);
  updateInnerHTML(currentWindNumber, `${locationObject.current.wind}mph`);
  updateInnerHTML(currentWindDirection, locationObject.current.windDir);
  updateInnerHTML(currentRainNumber, `${locationObject.current.precip}mm`);
  updateInnerHTML(currentHumidityNumber, `${locationObject.current.humidity}%`);
  updateInnerHTML(currentLocation, locationObject.location);
  updateInnerHTML(currentRegion, locationObject.region);
  updateInnerHTML(currentComment, locationObject.current.comment);
  updateInnerHTML(dateOne, locationObject.dayOne.date);
  updateInnerHTML(
    tempOne,
    `${locationObject.dayOne.minTemp}° - ${locationObject.dayOne.maxTemp}°`
  );
  updateInnerHTML(windOne, `${locationObject.dayOne.maxWind}mph`);
  updateInnerHTML(rainPercOne, `${locationObject.dayOne.willRain}%`);
  updateInnerHTML(commentOne, locationObject.dayOne.comment);
  updateInnerHTML(
    daylightOne,
    `${locationObject.dayOne.sunrise} - ${locationObject.dayOne.sunset}`
  );
  updateInnerHTML(dateTwo, locationObject.dayTwo.date);
  updateInnerHTML(
    tempTwo,
    `${locationObject.dayTwo.minTemp}° - ${locationObject.dayTwo.maxTemp}°`
  );
  updateInnerHTML(windTwo, `${locationObject.dayTwo.maxWind}mph`);
  updateInnerHTML(rainPercTwo, `${locationObject.dayTwo.willRain}%`);
  updateInnerHTML(commentTwo, locationObject.dayTwo.comment);
  updateInnerHTML(
    daylightTwo,
    `${locationObject.dayTwo.sunrise} - ${locationObject.dayTwo.sunset}`
  );
  updateInnerHTML(dateThree, locationObject.dayThree.date);
  updateInnerHTML(
    tempThree,
    `${locationObject.dayThree.minTemp}° - ${locationObject.dayThree.maxTemp}°`
  );
  updateInnerHTML(windThree, `${locationObject.dayThree.maxWind}mph`);
  updateInnerHTML(rainPercThree, `${locationObject.dayThree.willRain}%`);
  updateInnerHTML(commentThree, locationObject.dayThree.comment);
  updateInnerHTML(
    daylightThree,
    `${locationObject.dayThree.sunrise} - ${locationObject.dayThree.sunset}`
  );
}

updatePage("liverpool");
