import {log, getRandomInt} from './utils';

import dotenv from 'dotenv';

import cheerio from 'cheerio';

import request from 'request-promise';

import program from 'commander';

dotenv.config();

const BASE_URL = 'https://www.reddit.com/r/';

const DOMAINS = {
  1: 'pics/.json', 2: 'movies/.json', 3: 'gifs/.json', 4: 'funny/.json'
};

function fetchReddit(typeId, count, after) {
  return request(BASE_URL + DOMAINS[typeId] + '?count=' + count + '&after=' + after);
}


program
  .version('0.0.1')
  .option('-t --type [type Id]', 'type Id')
  .option('-c --count [count]', 'count')
  .option('-a --after [after]', 'time after')
  .parse(process.argv);


fetchReddit(program.type, program.count, program.after).then((resp) => {
  console.log(resp)
}).catch((err) => {
  console.log(err)
})
