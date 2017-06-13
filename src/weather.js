import NodeGeocoder from 'node-geocoder';

import Forecast from 'forecast';

import {log, getRandomInt} from './utils';

import dotenv from 'dotenv';

dotenv.config();

import program from 'commander';

var options = {
  provider: 'google',

  // Optionnal depending of the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_GEO_CODING_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

let forecast = new Forecast({
  service: 'darksky',
  key: process.env.darkSkyAPIKey,
  units: 'celcius',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});


function getForecast(lat, long) {
  forecast.get([lat, long], function(err, weather) {
  if(err) return console.dir(err);
  console.dir(weather);
});
}


program
  .version('0.0.1')
  .option('-a --address [address]', 'address')
  .parse(process.argv);

log(program.address);
// Using callback
geocoder.geocode(program.address, function(err, res) {
  if(err) {
    console.log(err)
  }else{
    let latitude = res[0].latitude;
    let longitude = res[0].longitude;

    getForecast(latitude, longitude);
  }
});
