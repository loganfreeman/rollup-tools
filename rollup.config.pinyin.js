import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/pinyin.js',
  sourceMap: true,
  plugins:   [ buble() ],
  format: 'cjs',
  dest: 'dist/pinyin.cjs.js',
  banner: '#!/usr/bin/env node'
};
