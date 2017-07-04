/* global global, process */
'use strict';

var mysql = require('mysql');

// Include local files
var configuration = require('../configuration.js');

// Instantiate the connection to the database
global.pool = mysql.createPool(configuration.mysql);

// Clean exit
process.on('SIGINT', function() {

    // End up the connection
    global.pool.end();
});
