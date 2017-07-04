/* global global, logger */
'use strict';

var Redis = require('redis');

// Include local files
var configuration = require('../configuration.js');

global.redis = Redis.createClient(configuration.redis);

global.redis.on('ready', function() {

    logger.info('The connection to the Redis Server is done.');
});

global.redis.on('error', function(err) {

    logger.error('Redis Error:', err.message, err.trace);
});
