#!/usr/bin/env node

// Allow the use of ES6/7 in node.
var fs = require('fs');
var babelrc = fs.readFileSync('./.babelrc');
var config = JSON.parse(babelrc);

require('babel-register')(config);
