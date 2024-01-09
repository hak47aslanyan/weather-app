async function getWeather() {
  const apiKey = "208052d718a18ff0829ea5b628b7e434";
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city.");
    return;
  }
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching weather data.");
  }
}

function displayWeather(data) {
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = `
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp} &deg;C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
}

function getWeatherIcon(iconCode) {
  const iconMap = {
    "01d": "sun",
    "02d": "cloud-sun",
    "03d": "cloud",
    "04d": "cloud",
    "09d": "cloud-showers-heavy",
    "10d": "cloud-rain",
    "11d": "bolt",
    "13d": "snowflake",
    "50d": "smog",
    "01n": "moon",
    "02n": "cloud-moon",
    "03n": "cloud",
    "04n": "cloud",
    "09n": "cloud-showers-heavy",
    "10n": "cloud-rain",
    "11n": "bolt",
    "13n": "snowflake",
    "50n": "smog",
  };

  return iconMap[iconCode] || "question-circle";
}
