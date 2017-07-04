/* global global, process */
'use strict';

// Load dependencies
var Winston = require('winston');

// Add colors to winston
Winston.addColors({
    debug: 'green',
    error: 'red',
    info: 'blue',
    warn: 'yellow'
});

// Instantiate the logger to console
global.logger = new (Winston.Logger)({
    transports: [
        new (Winston.transports.Console)({
            level: (process.env.NODE_ENV === 'production') ? 'warn' : 'silly',
            colorize: true
        })
    ]
});
