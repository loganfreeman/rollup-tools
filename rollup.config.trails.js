import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/trails.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/trails.cjs.js',
  banner: '#!/usr/bin/env node'
};
