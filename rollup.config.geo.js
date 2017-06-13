import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/geo.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/geo.cjs.js',
  banner: '#!/usr/bin/env node'
};
