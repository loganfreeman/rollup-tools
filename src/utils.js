import moment from 'moment';

import redis from 'redis';

import fs from 'fs';

import * as winston from 'winston';

import stringify from 'json-stringify-safe';

import Q from 'q';

const logLevel = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];


export function readFirstLine (path) {
  return Q.promise(function (resolve, reject) {
    var rs = fs.createReadStream(path, {encoding: 'utf8'});
    var acc = '';
    var pos = 0;
    var index;
    rs
      .on('data', function (chunk) {
        index = chunk.indexOf('\n');
        acc += chunk;
        index !== -1 ? rs.close() : pos += chunk.length;
      })
      .on('close', function () {
        resolve(acc.slice(0, pos + index));
      })
      .on('error', function (err) {
        reject(err);
      })
  });
}

export function loadJson(file) {
  let input = fs.readFileSync(file, 'UTF-8');
  return JSON.parse(input);
}

export function contains(array, needle) {
  if(typeof needle == 'function') {
    return !!array.find(needle)
  }
  return array.indexOf(needle) > -1
}

export function toArray(array) {
  if(Array.isArray(array)) {
    return array;
  }else{
    return [array];
  }
}

export function parseLogLevel(l) {

  if (typeof l == 'undefined') {
    return 'info';
  }
  if (!Number.isNaN(parseInt(l))) {
    return logLevel[parseInt(l)];
  } else {
    return String(l);

  }
}


export function logError(error) {
  if(error.config) {
    log(`${safeStringify(error.config)}`.red, 'info');
  }
  log(`${safeStringify(getError(error))}`.red, 'error');
}

export function getError(error) {
  if (error.response) {
    return {
      data: error.response.data,
      status: error.response.status,
      statusText: error.response.statusText
    };
  } else if(error.request) {
    return error.request;
  } else if(error.message) {
    return error.message;
  } else {
    return error;
  }
}

let logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)(),
    new(winston.transports.File)({
      filename: 'osplugin.log'
    })
  ]
});


let defaultLogger;

export function setupLogger(fileName, logLevel) {
  logLevel = parseLogLevel(logLevel);
  defaultLogger = logger;
  logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)({
        level: logLevel
      }),
      new(winston.transports.File)({
        filename: fileName,
        level: logLevel
      })
    ]
  });
}

export function restoreLogger() {
  logger = defaultLogger;
}

export function now() {
  return moment().format('YYYYMMDDHHmmss');
}

export function safeStringify(object) {
  if (typeof object == 'string') {
    return object;
  } else {
    return stringify(object);
  }
}

export function loadConfig(config) {
  let content = fs.readFileSync(config);
  let json = JSON.parse(content);
  return json;
}


export function formatBirthDate(jsonDate) {
  return moment(jsonDate).format('YYYY-MM-DD');
}


export function log(message, level = 'info') {
  logger.log(level, message);
}

export function calendar(time) {
  if (!time) {
    return 'the beginning'
  }
  return moment(time, 'YYYYMMDDHHmmss').calendar()
}


export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
