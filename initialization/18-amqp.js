/* global global, process, logger */
'use strict';

var Amqp = require('bazalt-amqp');

// Include local files
var configuration = require('../configuration.js');

// Initialize the Amqp Instance
global.amqp = new Amqp(configuration.queue.uri);

function connected() {

    logger.info('The connection to RabbitMQ is done.');
}

// Start the connection to the server
global.amqp.connect(connected);

var options = {
    durable: true,
    arguments: {
        'x-dead-letter-exchange': '',
        'x-dead-letter-routing-key': 'errors',
        'x-message-ttl': 60 * 1000
    }
};

// Define error queue
global.amqp.queue('errors', { durable: true });

// Create queues for requests and responses
global.amqp.queue('requests',  options);
global.amqp.queue('responses', options);
global.amqp.queue('logs',      options);
global.amqp.queue('stats',     options);

// Handle error
global.amqp.on('error', function(error) {
    
    logger.error('AMQP Error:', error);

    // Try to reconnect after 2s
    setTimeout(function() {

        global.amqp.reconnect(connected);
    }, 2000);
});

// Clean exit
process.on('SIGINT', function() {

    // End up with connection
    global.amqp.close();
});