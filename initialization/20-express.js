/* global global, process, __dirname */
'use strict';

// Load dependencies
var path           = require('path');
var express        = require('express');
var expressWinston = require('express-winston');
var compress       = require('compression');
var Winston        = require('winston');

// Include local files
var configuration = require('../configuration.js');


// Instantiate the express app
var app = express();

// Set x-powered-by
app.set('x-powered-by', false);

// Enable Gzip compression
app.use(compress({
    level: 9
})); 

// Enable winston logger
app.use(expressWinston.logger({
    transports: [
        new Winston.transports.Console({
            colorize: true
        })
    ],
    meta:          false,
    expressFormat: true,
    colorStatus:   true
}));

// Apply only if in production
var maxAge = (process.env.NODE_ENV === 'production') ? configuration.assets.maxAge || 0 : 0;

// Folder exposed
var folder = path.resolve(__dirname + '/../public');

// Expose the static folder
app.use(express.static(folder, {
    maxAge: maxAge
}));

// Start the server
global.server = app.listen(configuration.port);

// Clean exit
process.on('SIGINT', function() {

    // End up the connection
    global.server.close();
});