/* global mongodb */
'use strict';

// Generic callback
var done = function(result, callback) {

    // Check for the validity of the callback
    if('function' === typeof callback)
    {
        callback(result);
    }
};

class ConnectionLoader {

    connection(database, callback) {
        // Select the target database
        var connection = global.mongodb.db(database.getDatabaseName());

        done(connection, callback);
    }
}

// Load a single instance
var loader = new ConnectionLoader();

module.exports = loader;
