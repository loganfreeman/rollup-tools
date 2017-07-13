import {log, getRandomInt, append} from './utils';

import parse from 'csv-parse';

import csvtojson from 'csvtojson';

import dotenv from 'dotenv';

dotenv.config();

import program from 'commander';

const CPS2_COLUMNS = ['CPE1', 'CPE2a', 'CPE2b', 'CPE2c', 'CPE2d', 'CPE2e', 'CPE2f', 'CPE3a', 'CPE3b', 'CPE3c', 'CPE3d', 'CPE3e'];

program
  .version('0.0.1')
  .option('-f --file [file]', 'pinyin file in csv format')
  .option('-p --cps1 [cps1]', 'CPS1')
  .option('-s --cps2 [cps2]', 'CPS2')
  .parse(process.argv);

function run(names, cps1, cps2, cps2_index) {
  let results = [];

  let i = cps2_index;

  while(results.length < 3) {
    let key = CPS2_COLUMNS[i];

    let temp_results = names[cps1].filter((entry) => {
      return entry[key] == cps2;
    });

    results = results.concat(temp_results);

    i = i + 1;

    if(i == CPS2_COLUMNS.length) {
      break;
    }
  }

  return results;


}

function sortNameByColumn(all_names, column) {
  let names = [];
  all_names.forEach(jsonObj => {
    append(names, jsonObj[column], jsonObj); // sort by CPE1
  })
  return names;
}

function produce(all_names, cps1, cps2) {
  let i = 0;
  let column = CPS2_COLUMNS[i];
  let sorted = sortNameByColumn(all_names, column);
  let results = run(sorted, cps1, cps2, i + 1);
  while(results.length < 3) {
    i = i + 1;
    if(i == CPS2_COLUMNS.length - 1) {
      break;
    }
    let temp_results = run(sorted, cps1, cps2, i + 1);
    results = results.concat(temp_results);
  }
  return results;
}


let f = program.file;

let all_names = [];

csvtojson().fromFile(f)
.on('json', (jsonObj) => {
  all_names.push(jsonObj);
})
.on('done', error => {
  let results = produce(all_names, program.cps1, program.cps2);
  console.log(results.map((entry) => entry['Name']));
})
