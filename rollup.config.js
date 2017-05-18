import buble from 'rollup-plugin-buble';

export default {
  entry:     'src/cli.js',
  sourceMap: true,
  plugins:   [ buble() ]
};
