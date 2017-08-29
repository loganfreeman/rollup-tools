import {log, getRandomInt} from './utils';

import dotenv from 'dotenv';

import cheerio from 'cheerio';

import axios from 'axios';

dotenv.config();

const UTAH_FISHING_URL = "https://wildlife.utah.gov/hotspots/";

function findTextAndReturnRemainder(target, variable) {
  let index = target.search(variable);
  if(index == -1) {
    return null;
  }
  let chopFront = target.substring(index + variable.length, target.length);
  let result = chopFront.substring(0, chopFront.search(";"));
  return result;
}

function getWaterBody(text) {
  if (!text) {
    return;
  }
  let findAndClean = findTextAndReturnRemainder(text, "var waterbody =")
  if (findAndClean) {
    var result = eval(findAndClean);

    result.forEach((waterbody) => {
      waterbody.url = `https://wildlife.utah.gov/hotspots/detailed.php?id=${waterbody[3]}`
      console.log(waterbody)
    })
  }
}

function getHotSpots() {

  axios.get(UTAH_FISHING_URL).then(res => {
    let $ = cheerio.load(res.data);

    $('script').each((index, element) => {
      getWaterBody($(element).html());
    });
  });

}

getHotSpots();
