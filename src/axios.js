import {log, getRandomInt} from './utils';

import dotenv from 'dotenv';

import cheerio from 'cheerio';

import axios from 'axios';

dotenv.config();

const UTAH_FISHING_URL = "https://wildlife.utah.gov/hotspots/";

function getDirectionUrl(latitude, longitude) {
  return `http://maps.google.com/?q=${latitude},${longitude}`
}

function getRating(status) {
  let ratings = {
    "Good": 3,
    "Hot": 4,
    "Fair": 2,
    "Slow": 1,
    "Closed": 0,
    "No recent report": 0
  }
  return Array.from(new Array(ratings[status]), (x,i) => i)
  //return ratings[status];
}

function findTextAndReturnRemainder(target, variable) {
  let index = target.search(variable);
  if(index == -1) {
    return null;
  }
  let chopFront = target.substring(index + variable.length, target.length);
  let result = chopFront.substring(0, chopFront.search(";"));
  return result;
}

function getWaterBody(text,waterbodies = []) {
  if (!text) {
    return;
  }
  let findAndClean = findTextAndReturnRemainder(text, "var waterbody =")
  if (findAndClean) {
    var result = eval(findAndClean);

    result.forEach((waterbody) => {
      let url = `https://wildlife.utah.gov/hotspots/detailed.php?id=${waterbody[3]}`;
      waterbodies.push({
        title: waterbody[0],
        latitude: waterbody[1],
        longitude: waterbody[2],
        status: waterbody[4],
        rating: getRating(waterbody[4]),
        kind: waterbody[5],
        link: url,
        direction: getDirectionUrl(waterbody[1], waterbody[2])
      });
    })
  }
  return waterbodies;
}

export default function extractFishingReport(html) {
  let $ = cheerio.load(html);
  let waterbodies = [];
  $('script').each((index, element) => {
    getWaterBody($(element).html(), waterbodies);
  });
  return waterbodies;
}

axios.get(UTAH_FISHING_URL)
.then(res => {
  console.log(extractFishingReport(res.data));
})
.catch(error => {
  console.log(error); //eslint-disable-line
});
