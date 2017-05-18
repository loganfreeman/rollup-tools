import parse from 'csv-parse/lib/sync';

import {describe, it} from 'mocha';
import {assert} from 'chai';

import fs from 'fs';

import csvtojson from 'csvtojson';


import { loadJson, contains } from '../src/utils';

import { parseHeader } from '../src/csv';

describe('csv', () => {

  it('should parse header', (done) => {
    parseHeader('./UCPOpenSpecimenTestB_DATA_2017-05-18_1111.csv').then((json) => {
      console.log(json);
      done();
    })
  })

  it('should convert csv to json', (done) => {
    csvtojson()
    .fromFile('./UCPOpenSpecimenTestB_DATA_2017-05-18_1111.csv')
    .on('json',(jsonObj)=>{
    	//console.log(jsonObj);
    })
    .on('done',(error)=>{
    	done();
    })
  })

  it('should parse csv file', () => {
    let input = fs.readFileSync('./UCPOpenSpecimenTestB_DATA_2017-05-18_1111.csv', 'UTF-8');
    // console.log(content);
    let records = parse(input, {columns: true});
    console.log(records);
  })


  it('should load fields', () => {
    let input = fs.readFileSync('./fields.json', 'UTF-8');
    let fields = JSON.parse(input);
    let fieldNames = fields.map((field) => field.field_name);
    assert.isTrue(contains(fieldNames, 'race'));
    assert.isTrue(contains(fieldNames, 'ethnicity'));
  })

  it('should load demographics json', () => {
    let json = loadJson('./demographics.json');
    console.log(json.map((field) => field.field_name));
  })
})
