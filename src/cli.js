import webdriverio from 'webdriverio';
import selenium from 'selenium-standalone';
import {
  log
} from './utils';

function exit() {
  process.exit(0);
}

function done(err) {
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
    .url('https://duckduckgo.com/')
    .setValue('#search_form_input_homepage', 'WebdriverIO')
    .click('#search_button_homepage')
    .getTitle().then(function(title) {
      console.log('Title is: ' + title);
    })
    .end();

  client.on('end', () => {
    //exit();
  })
}

function start() {
  selenium.start(function(err, child) {
    if (err) return done(err);
    selenium.child = child;
    done();
  });
}


log("Running ......");

selenium.install({
  logger: function(message) {}
}, start);
