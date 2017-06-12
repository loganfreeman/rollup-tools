import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/fishing.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/fishing.cjs.js',
  banner: '#!/usr/bin/env node'
};
