import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/reddit.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/reddit.cjs.js',
  banner: '#!/usr/bin/env node'
};
