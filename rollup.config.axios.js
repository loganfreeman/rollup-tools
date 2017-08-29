import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/axios.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/axios.cjs.js',
  banner: '#!/usr/bin/env node'
};
