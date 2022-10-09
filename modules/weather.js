'use strict';

const axios = require('axios');

const cache = require('./cache');

async function searchWeather(req, res) {
    const url = process.env.REACT_APP_API_WEATHER_URL;

        try {
            const key = `weather-${req.query.searchQuery}`;
      
            if (cache[key] && Date.now() - cache[key].timeStamp < 5000) {
              console.log('Cache was hit!!');
              res.status(200).send(ParsedData(cache[key].data, cache[key].timestamp));
            } else { 
              const foundData = await axios.get(url, {
                params: {
                  key: process.env.Weather_API_KEY,
                  lat: req.query.lat,
                  lon: req.query.lon,
                }
              });
      
              // save data to cache
              cache[key] = {
                timeStamp: Date.now(),
                data: ParseData(foundData.data)
              };
            }

        res.status(200).send(ParseData(foundData.data, 'weather'));
        
    } catch (error) {
        res
        .status(500)
        .send(`Error occured on server: ${error.code} -${error.message}`);
    }
}

  class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
  }

const ParsedData = data => {
    return data.data.map(
        weather =>
        new Forecast(
            weather.valid_date,
            `Low of ${weather.low_temp}, high of ${weather.high_temp}, with ${weather.weather.description}`, timeStamp
        )
    )
}

module.exports = searchWeather;