'use strict';

const axios = require('axios');

async function searchWeather(req, res) {
    const url = process.env.REACT_APP_API_WEATHER_URL;

    try {
        const foundData = await axios.get(url, {
            parameters: {
                key: process.env.WEATHER_API_KEY,
                lat: req.query.lat,
                lon: req.query.lon,
            },
        });
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