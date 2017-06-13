import {log, getRandomInt} from './utils';

import dotenv from 'dotenv';

import cheerio from 'cheerio';

import request from 'request';

import phantom from 'phantom';

dotenv.config();

import program from 'commander';

const ALLTRAILS_EXPLORE_URL = "https://www.alltrails.com/explore?q=";

const ALLTRAILS_HOME_URL = "https://www.alltrails.com";

function parseHtml(html) {
  let $ = cheerio.load(html);

  let trails = [];

  $('.trail-result-card').each((index, element) => {
    let image = $(element).children('link[itemprop="image"]').attr('href');
    let url = $(element).children('a[itemprop="url"]').attr('href');
    let title = $('div[itemprop="name"]', '.item-info', element).text();

    let difficulty = $('.difficulty-info', '.item-info', element).children('.diff').text();

    let location = $('.location-label', '.item-info', element).text();

    let metadata = {
      image: `${ALLTRAILS_HOME_URL}${image}`,
      url: `${ALLTRAILS_HOME_URL}${url}`,
      title: title,
      difficulty: difficulty,
      location: location
    }

    console.log(metadata);

    trails.push(metadata);
  })
}

function getTrails(zipcode) {

}

let _ph, _page, _outObj;

program
  .version('0.0.1')
  .option('-z --zipcode [zip code]', 'zip code')
  .parse(process.argv);

phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'], {
  logLevel: 'info'
}).then(ph => {
    _ph = ph;
    return _ph.createPage();
}).then(page => {
    _page = page;
    return _page.open(`${ALLTRAILS_EXPLORE_URL}${program.zipcode}`);
}).then(status => {
    console.log(status);
    return _page.property('content')
}).then(content => {
    //console.log(content);
    parseHtml(content);
    _page.close();
    _ph.exit();
}).catch(e => console.log(e));
