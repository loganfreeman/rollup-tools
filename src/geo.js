import NodeGeocoder from 'node-geocoder';

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
    console.log(res);
  }
});
