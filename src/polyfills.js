// polyfills.js
global.crypto = require('crypto');
global.stream = require('stream-browserify');
global.http = require('stream-http');
global.https = require('https-browserify');
global.zlib = require('browserify-zlib');
global.url = require('url/');
