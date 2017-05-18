import config from './rollup.config';

config.format     = 'cjs';
config.dest       = 'dist/lib.cjs.js';
config.moduleName = 'lib';
config.banner = '#!/usr/bin/env node';

export default config;
