import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/weather.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/weather.cjs.js',
  banner: '#!/usr/bin/env node'
};
