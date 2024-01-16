const inputField = document.getElementById('inputField');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const apiKey = 'b0921993cbec62f2296be4f990cdfa03'

function getWeather () {
    const cityName = inputField.value.trim();
    if(!cityName) {
        return alert('Please Enter a Valid City Name')
    }

    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if(!data.length) {
                alert('No data found')
            }
            const {name, lat, lon} = data[0];
            getWeatherDetails(name, lat, lon)
            console.log(data)
        })
        .catch(() => {
            alert('An Error occured')
        })
};

function getWeatherDetails (cityName, lat, lon) {
    const dailyWeatherApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(dailyWeatherApi)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let uniqueForecastDay = [];
            const fiveDayForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if(!uniqueForecastDay.includes(forecastDate)) {
                    return uniqueForecastDay.push(forecastDate)
                }
            })
            console.log(fiveDayForecast)
        })
        .catch(() => {
            alert('An Error occured')
        })
}

searchBtn.addEventListener('click', getWeather)

