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
        const weather = await this.getActualWeatherByCityName(city);
        const weatherDescription =  weather.weather.map(w=>{
            console.log(w)
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
        console.log(weather);
        console.log('weather parsed', weatherParsed)
        if (weather != null && weather.cod === 200) {
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
    //City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
    //ip-api y el estado del tiempo a 5 días
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
        const url = 'http://api.ipstack.com/' + '8.8.8.8' + '?access_key=' + process.env.IPSTACK_APIKEY;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getActualWeatherByCityName(cityName) {
        const url = `${process.env.WEATHER_HOST}/weather?q=${cityName}&appid=${process.env.WEATHER_APIKEY}&units=metric&lang=es`
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getForecastByCityName(cityName) {
        const url = `${process.env.WEATHER_HOST}/forecast?q=${cityName}&appid=${process.env.WEATHER_APIKEY}&units=metric&lang=es`
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
