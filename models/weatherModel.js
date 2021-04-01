const axios = require("axios");
const {getClientIP} = require('../helpers');

module.exports = {
    async getWeatherLocation(req,res) {
        const clientIp = getClientIP(req)
        const locationData = await this.getLatLong(clientIp);
        if (locationData.latitude != null && locationData.longitude != null) {
            return res.status(200).send(locationData);
        } else {
            res.status(500).send({
                error: 'there was an error looking the location'
            });
        }
    },
    async getSpecificCity(req, res) {
    // City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
    //ip-api y el estado del tiempo actual.
        let city;
        if (req.params.city) {
            city = req.params.city;
        } else {
            let latLong = await this.getLatLong();
            city = latLong.city
        }
        const weather = await this.getWeatherByCityName(city);
        if (weather != null) {
            return res.status(200).send(
                {
                    'location': city,
                    'weather':weather
                }
            );
        }
        return res.status(500).send({
            error: 'there was an error',
        })
    },
    getForecastCity(city) {
    //City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
    //ip-api y el estado del tiempo a 5 días
    },
    async getLatLong(ipAddress) {
        const url = 'http://api.ipstack.com/' + '8.8.8.8' + '?access_key=' + process.env.IPSTACK_APIKEY;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getWeatherByCityName(cityName) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_APIKEY}`
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
