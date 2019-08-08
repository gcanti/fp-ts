#!/usr/bin/env node

const fs = require('fs');

const package = Object.assign({}, require('../package.json'), {
  private: false,
  scripts: {},
  files: ['*'],
});

fs.writeFileSync('lib/package.json', JSON.stringify(package, null, 2));
