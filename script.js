const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')
const weatherInfoSection = document.querySelector('.weather-info')

const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date-txt')

const apiKey = 'f2a34c51c330b0316678b998175cf66f';



searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
})

cityInput.addEventListener('keydown', (event) =>{
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value.trim());
        cityInput.value = '';
        cityInput.blur();

    }

})
 async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiUrl)
    return response.json()
}



async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city)
    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection)

        return
    }

    console.log(weatherData)
    const {
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}

    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' ºC'
    humidityValueTxt.textContent = humidity + '%'
    conditionTxt.textContent = main
    windValueTxt.textContent = speed + 'm/s'

    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`




    showDisplaySection(weatherInfoSection)
    
    
}

function getWeatherIcon(id){
    if(id >= 200 && id <= 232) return 'thunderstorm.svg'
    if (id >= 300 && id <= 321) return 'drizzle.svg'
    if (id >= 500 && id <= 531) return 'rain.svg'
    if (id >= 600 && id <= 622) return 'snow.svg'
    if (id >= 701 && id <= 781) return 'atmosphere.svg'
    if (id == 800) return 'clear.svg'
    if (id >= 801 && id <= 804) return 'clouds.svg'
    else return 'clouds.svg'
}

function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')

    section.style.display = 'flex'


}