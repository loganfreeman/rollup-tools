import webdriverio from 'webdriverio';
import selenium from 'selenium-standalone';
import {log, getRandomInt} from './utils';

import dotenv from 'dotenv';

import cheerio from 'cheerio';

import request from 'request';

dotenv.config();

const POST_IMAGE_SRC = "/mitbbs_images/unknownspace-yellow/postnew.gif";

const LOGOUT_URL = "/newindex/mitbbs_bbslogout.php?index_flag=1";

const PHP_BIANCHENG_URL = "http://www.jb51.net/list/list_15_1.htm";

function exit() {
  process.exit(0);
}

function login(browser, news) {

  let text = `${news.title}

  Link: ${news.url}

  `;

  return browser
  .click('a#userid')
  .setValue('input[name="id"]', process.env.username)
  .setValue('input[name="passwd"]', process.env.password)
  .click('input[name="login"]').click(`a[href="${process.env.board}"]`)
  .click(`img[src="${POST_IMAGE_SRC}"]`)
  .setValue('input[name="title"]', news.title)
  .setValue('textarea[name="text"]', text)
  .click('input[type="submit"]')
  .pause(3000)
  .click(`a[href="${LOGOUT_URL}"]`)

}

function getRandomItem(list) {
  return list[getRandomInt(0, list.length)];

}

function getHackerNews(callback) {
  request('https://news.ycombinator.com', function(error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);

      let newsList = [];

      $('span.comhead').each(function(i, element){
        var a = $(this).prev();
        var rank = a.parent().parent().text();
        var title = a.text();
        var url = a.attr('href');
        var subtext = a.parent().parent().next().children('.subtext').children();
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();
        var comments = $(subtext).eq(2).text();
        // Our parsed meta data object
        var metadata = {
          rank: parseInt(rank),
          title: title,
          url: url,
          points: parseInt(points),
          username: username,
          comments: parseInt(comments)
        };
        //console.log(metadata);
        //
        newsList.push(metadata);

      });

      callback(newsList);
    }
  });
}

function postToMitbss(news) {
  let options = {
    desiredCapabilities: {
      browserName: 'chrome'
    }
  };
  let client = webdriverio.remote(options);
  client.init().url('http://www.mitbbs.com/').then(() => {
    return login(client, news);
  }).then(() => {
    //client.end();
  })

  client.on('end', () => {
    //exit();
  })
}

function doSomething(browser) {
  browser.setValue('#search_form_input_homepage', 'WebdriverIO').click('#search_button_homepage').getTitle().then(function(title) {
    console.log('Title is: ' + title);
  })
}

function run(err) {
  if (err) {
    return log(err, 'error');
  }
  function callback(newsList) {
    postToMitbss(getRandomItem(newsList))
  }
  getHackerNews();
}

function start() {
  selenium.start(function(err, child) {
    if (err)
      return done(err);
    selenium.child = child;
    run();
  });
}

log("Running ......");

selenium.install({
  logger: function(message) {
    log(message);
  }
}, start);
