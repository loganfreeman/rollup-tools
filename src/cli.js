import webdriverio from 'webdriverio';
import selenium from 'selenium-standalone';
import {
  log
} from './utils';

import dotenv from 'dotenv';


dotenv.config();

function exit() {
  process.exit(0);
}

function login(browser) {

   return browser.click('a#userid')
   .setValue('input[name="id"]', process.env.username)
   .setValue('input[name="passwd"]', process.env.password)
   .click('input[name="login"]');
    


}

function doSomething(browser) {
  browser.setValue('#search_form_input_homepage', 'WebdriverIO')
  .click('#search_button_homepage')
  .getTitle().then(function(title) {
    console.log('Title is: ' + title);
  })
}

function run(err) {
  if (err) {
    return log(err, 'error');
  }
  let options = {
    desiredCapabilities: {
      browserName: 'chrome'
    }
  };
  let client = webdriverio.remote(options);
  client
    .init()
    .url('http://www.mitbbs.com/').then(() => {
      return login(client);
    }).then(() => {
      //client.end();
    })



  client.on('end', () => {
    //exit();
  })




}

function start() {
  selenium.start(function(err, child) {
    if (err) return done(err);
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
