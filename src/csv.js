import parse from 'csv-parse';

import csvtojson from 'csvtojson';

import { readFirstLine } from './utils';

export function parseHeader(csvFile) {
  return readFirstLine(csvFile).then((line) => {
    let headers = line.split(',');
    return headers.reduce((accum, item) => {
      accum[item] = '';
      return accum;
    }, {});

  })
}
