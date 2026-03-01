const apiKey = CONFIG.API_KEY;
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-info');

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temp').innerText = Math.round(data.main.temp);
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind').innerText = `${data.wind.speed} km/h`;
    document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;
    
    weatherCard.style.display = 'block';
}

searchBtn.addEventListener('click', () => {
    if (cityInput.value) fetchWeather(cityInput.value);
});


cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
});