/* global global, process */
'use strict';

var MongoClient = require('mongodb').MongoClient;

// Include local files
var configuration = require('../configuration.js');

// Instantiate the connection to the database
MongoClient.connect(configuration.mongodb.url, configuration.mongodb.options, function(err, connection) {
    if(err)
    {
        logger.error(err.getMesssage());

        return;
    }

    global.mongodb = connection;

    logger.info('The connection to the MongoDB Server is done.');
});

// Clean exit
process.on('SIGINT', function() {

    if(global.mongodb)
    {
        global.mongodb.close();
    }
});
