//Authored by Salma Crank
//Module which will perform API calls to weather API. 

import { key } from "../components/events/weather/weatherkey.js"

let weatherData = [];

export const eventWeatherData = () => {
    return [...weatherData]
}

export const getWeatherData = () => {
    return fetch (`https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},us&appid=${key.weatherKey}`)
    .then((response) => response.json())
    .then(data => {
        weatherData = data;
        return data;
    })
}

export const get16DayForecast = () => {
    return fetch (`https://api.openweathermap.org/data/2.5/forecast/daily?q={city name},{state code},us&cnt=7&appid=${key.weatherKey}`)
    .then((response) => response.json())
    .then(data => {
        weatherData = data;
        return data;
    })
}