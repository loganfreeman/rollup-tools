import {log, getRandomInt} from './utils';

import parse from 'csv-parse';

import csvtojson from 'csvtojson';

import dotenv from 'dotenv';

dotenv.config();

import program from 'commander';

program
  .version('0.0.1')
  .option('-f --file [file]', 'pinyin file in csv format')
  .parse(process.argv);


let f = program.file;

let names = {};

csvtojson().fromFile(f)
.on('json', (jsonObj) => {

})
.on('done', error => {
  console.log('end')
})
