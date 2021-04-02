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
        let city;
        if (req.params.city) {
            city = req.params.city;
        } else {
            let latLong = await this.getLatLong();
            city = latLong.city
        }
        const weather = await this.getActualWeatherByCityName(city);
        if (weather != null && weather.cod === 200) {
            const weatherDescription =  weather.weather.map(w=>{
                return {
                    weather_description: w.description,
                }
            });
            const weatherParsed = {
                datetime: weather.dt,
                temp: weather.main.temp,
                feels_like: weather.main.feels_like,
                temp_min: weather.main.temp_min,
                temp_max: weather.main.temp_max,
                humidity: weather.main.humidity,
                weather_description: weatherDescription,
                wind_speed: weather.wind.speed,
            }
            return res.status(200).send(
                {
                    'location': city,
                    'weather':weatherParsed
                }
            );
        }
        return res.status(500).send({
            error: 'there was an error',
        })
    },
    async getForecastCity(req,res) {
        let city;
        if (req.params.city) {
            city = req.params.city;
        } else {
            let latLong = await this.getLatLong();
            city = latLong.city;
        }
        const response = await this.getForecastByCityName(city);
        if (response != null && response.cod == 200) {
            let result = response.list.map(a => {
                return {
                    datetime: a.dt_txt,
                    temp: a.main.temp,
                    feels_like: a.main.feels_like,
                    temp_min: a.main.temp_min,
                    temp_max: a.main.temp_max,
                    humidity: a.main.humidity,
                    weather_description: a.weather[0].description,
                    wind_speed: a.wind.speed,
                } 
            });
            return res.status(200).send({
                'location': city,
                'forecast': result,
            });
        } else {
            res.status(500).send({
                error: 'there was an error looking the forecast for the location ' + city
            });
        }
    },
    async getLatLong(ipAddress) {
        const url = process.env.IPSTACK_HOST + '/' + ipAddress + '?access_key=' + process.env.IPSTACK_APIKEY;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    async getActualWeatherByCityName(cityName) {
        const units = 'metric';
        const lang = 'es';
        const url = `${process.env.WEATHER_HOST}/weather?q=${cityName}&appid=${process.env.WEATHER_APIKEY}&units=${units}&lang=${lang}`
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return error;
            
        }
    },
    async getForecastByCityName(cityName) {
        const units = 'metric';
        const lang = 'es';
        const count = 5;
        const url = `${process.env.WEATHER_HOST}/forecast?q=${cityName}&appid=${process.env.WEATHER_APIKEY}&units=${units}&lang=${lang}&cnt=${count}`
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return error;
        }
    }
};
