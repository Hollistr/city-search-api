'user strict'

require('dotenv').config();

// express server
const express = require('express');

// allows for Cross Origin Resource Sharing
const cors = require('cors');

const axios = require('axios');

const { response } = require('express');

// import modules
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');
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
app.get('/weather', getWeather);
app.get('/movies', getMovies);

// catch all endpoint
app.get('/', (req, res) => {
  res.status(404).send('Page Not Found');
})

// async function searchWeather(req, res) {
//     const url = process.env.REACT_APP_API_WEATHER_URL;

//     try {
//         const foundData = await axios.get(url, {
//             parameters: {
//                 key: process.env.WEATHER_API_KEY,
//                 lat: req.query.lat,
//                 lon: req.query.lon,
//             },
//         });
//         res.status(200).send(ParseData(foundData.data, 'weather'));
//     } catch (error) {
//         res
//         .status(500)
//         .send(`Error occured on server: ${error.code} -${error.message}`);
//     }
// }

// async function searchMovies(req, res) {
//     const url = process.env.REACT_APP_API_MOVIES_URL;
  
//     try {
//       const foundData = await axios.get(url, {
//         params: {
//           api_key: process.env.MOVIE_API_KEY,
//           query: req.query.searchQuery,
//         },
//       });
//       res.status(200).send(ParseData(foundData.data));
//     } catch (error) {
//       console.log(`Query failed! ${error.message}`);
//       res
//         .status(500)
//         .send(`Error occurred on server: ${error.code} - ${error.message}`);
//     }
//   }

//   class Forecast {
//     constructor(date, description) {
//         this.date = date;
//         this.description = description;
//     }
//   }

//   class Movies {
//     constructor(obj) {
//       (this.title = obj.title),
//         (this.overview = obj.overview),
//         (this.average_votes = obj.average_votes),
//         (this.total_votes = obj.vote_count),
//         (this.image_url =
//           'https://image.tmdb.org/t/p/original' + obj.poster_path),
//         (this.popularity = obj.popularity),
//         (this.released_on = obj.release_date);
//     }
//   }
  
// catch all endpoint
app.get('/', (req, res) => {
    res.status(404).send('Page Not Found');
})

