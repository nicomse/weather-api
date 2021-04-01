const axios = require("axios");

module.exports = {
  getWeatherLocation(req,res) {
    const clientIp = this.getClientIP(req)
    const locationData = this.getLatLong(clientIp);
    if (locationData.latitude != null && locationData.longitude != null) {
        return locationData;
    } else {
        res.status(500).send({
            error: 'there was an error looking the location'
        });
    }
  },
  getSpecificCity(city) {
    // City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
    //ip-api y el estado del tiempo actual.
  },
  getForecastCity(city) {
    //City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
    //ip-api y el estado del tiempo a 5 días
  },
  getClientIP(req) {
    return req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  },
  async getLatLong(ipAddress) {
    const url = 'http://api.ipstack.com/' + ipAddress + '?access_key=' + process.env.IPSTACK_APIKEY;
    try {
        const response = await axios.get(url);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
  },
};
