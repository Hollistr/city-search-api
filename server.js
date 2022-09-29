'user strict'

require('dotenv').config();

// express server
const express = require('express');

// allows for Cross Origin Resource Sharing
const cors = require('cors');

// load data
const data = require('./data/data.json');

// start server
const app = express();

// middleware
app.use(cors());

// declare PORT variable
const PORT = process.env.PORT || 3001;

// listening for connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// endpoint
app.get('/weather', searchWeather);

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

// catch all endpoint
app.get('/', (req, res) => {
    res.status(404).send('Page Not Found');
})

