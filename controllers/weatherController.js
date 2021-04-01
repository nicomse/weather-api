const weatherModel = require('../models/weatherModel');
module.exports = {
    getLocation(req, res) {
        return weatherModel.getWeatherLocation(req, res);
    },
    getSpecificCity(req, res) {
        return weatherModel.getSpecificCity(req, res);
    },
    getForecastCity(req, res) {
        return weatherModel.getForecastCity(req, res);
    },
}