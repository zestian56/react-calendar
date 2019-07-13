import config from "../config";

class WeatherService {
    constructor() {
        this.url = config.openWeatherConfig.url;
    }

    getWeatherByCityId = cityId => {
        return fetch(
            `${this.url}weather?id=${cityId}&appid=${config.openWeatherConfig.apiKey}`
        ).then(function(response) {
            return response.json();
        });
    };
}

export default WeatherService;