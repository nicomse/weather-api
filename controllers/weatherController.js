const weatherModel = require('../models/weatherModel');
module.exports = {
    getLocation(req, res) {
        return weatherModel.getWeatherLocation(req, res);
    },
    getSpecificCity(city) {
        return weatherModel.getSpecificCity(req, res);
    },
    getForecastCity(city) {
        return weatherModel.getForecastCity(req, res);
    },
}