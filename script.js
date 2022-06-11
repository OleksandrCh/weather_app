let your_location = 'Kiev'
const weatherBlock = document.querySelector('#weather')

async function loadWeather(e) {
    weatherBlock.innerHTML = ` 
            <div class="weatherPreload">
                <img src="img/loading-loading-forever.gif" alt="Loading...">
            </div>`;

    const key = '54612c8d1a5826dcc1c947b7e2439968';
    let linkServer = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=54612c8d1a5826dcc1c947b7e2439968`;
    const response = await fetch(linkServer, {method: 'GET'});
    const resultResponse = await response.json();
    console.log(resultResponse)
    if (response.ok) {
        getWeather(resultResponse);
    } else {
        weatherBlock.innerHTML = resultResponse.message
    }
}

function getWeather(dataWeather) {
    const location = dataWeather.name;
    const temp = Math.round(dataWeather.main.temp);
    const feelsLike = Math.round(dataWeather.main.feels_like);
    const weatherStatus = dataWeather.weather[0].main;
    const weatherIcon = dataWeather.weather[0].icon;

    const template = `
            <div class="weatherHeader">
                <div class="weatherMain">
                    <div class="weatherCity">${location}</div>
                    <div class="weatherStatus">${weatherStatus}</div>
                </div>
                <div class="weatherIcon">
                    <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Cloud">
                </div>
            </div>
            <div class="weatherTemp">${temp}C</div>
            <div class="weatherFeeldsLike">Feels like:${feelsLike}</div>`
    weatherBlock.innerHTML = template;
}

if (weatherBlock) {
    loadWeather();
}
