/* global logger, amqp */
'use strict';

// Load dependencies
var Query = require('bazalt-query');

// Load local dependencies
var SchemaLoader = require('./schema-loader');

// Consume the requests queue
amqp.queue('requests').consume(function(err, request, accept, reject) {
    if(err)
    {
        return reject();
    }

    logger.debug('New request', request);

    // Define the function to send the result
    var sendResult = function(error, result) {

        // Generate message for RabbitMQ
        var payload = {
            sparks: [
                request.spark
            ],
            event:  request.event
        };

        // If there is an error, add it to the response
        if('undefined' !== typeof error)
        {
            payload.error = error;
        }

        // If there is a result, add it to the response
        if('undefined' !== typeof result)
        {
            payload.result = result;
        }

        // If there is an identifier, add it to the response
        if('undefined' !== typeof request.identifier)
        {
            payload.identifier = request.identifier;
        }

        // Send it to the responses queue
        amqp.queue('responses').send(payload);
        
        // The request is accepted
        return accept();
    };

    SchemaLoader.schema(request.application, request.query.model, function(schema) {
        if('undefined' === typeof schema)
        {
            return;
        }

        var query = Query.fromObject(request.query);

        query.transformer(schema.transformer);

        query.exec(sendResult);
    });
});
