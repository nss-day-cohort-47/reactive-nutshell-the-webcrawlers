//Authored by Salma Crank
//Module which will perform API calls to weather API. 

import { key } from "./keys.js"

let weatherData = [];

export const eventWeatherData = () => {
    return [...weatherData]
}

export const getWeatherData = () => {
    return fetch (`https://api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid=${key.weatherKey}`)
    .then((response) => response.json())
    .then(data => {
        weatherData = data;
        return data;
    })
}