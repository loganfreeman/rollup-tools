import buble      from 'rollup-plugin-buble';
import multiEntry from 'rollup-plugin-multi-entry';

let entry = [];

if(process.env.FILE) {
  entry.push(`tests/**/${process.env.FILE}.test.js`)
}else{
  entry.push('tests/**/*.test.js')
}

export default {
  entry:     entry,
  plugins:   [buble(), multiEntry()],
  format:    'cjs',
  external:  [ 'mocha', 'chai' ],
  intro:     'require("source-map-support").install();',
  dest:      'build/tests-bundle.js',
  sourceMap: true
};
