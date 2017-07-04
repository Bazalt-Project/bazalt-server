/* global logger, primus, amqp */
'use strict';

var Query = require('bazalt-query');

// Load local dependencies
var SchemaLoader = require('../backend/schema-loader');

primus.on('connection', function(spark) {

    // Extract token
    var token = spark.request.token || {};

    logger.debug('Connection from ApiToken[%s] with Spark[%s]', token.token, spark.id);

    SchemaLoader.application(token.application_id, function(schemas) {

        // Extract definitions
        var definitions = {};

        for(let name in schemas) {

            definitions[name] = schemas[name].definition;
        }

        // Send initialization data
        spark.write({
            event:   'bazalt:initialize',
            time:    new Date(),
            schemas: definitions
        });
    });

    // On data received
    spark.on('data', function(data) {
        logger.debug('Incoming data', data);

        // Check reserved event
        if(!data || !data.event || primus.reserved(data.event)) return;

        spark.emit.call(spark, data.event, data);
    });

    // Handle queries
    spark.on('bazalt:query', function(data) {
        // Load query from data and clean it
        var query = Query.fromObject(data);

        // Generate message for RabbitMQ
        var payload = {
            application: token.application_id,
            spark:       spark.id,
            event:       data.event,
            query:       query.toObject()
        };

        // If there is an identifier, add it
        if(null !== data.identifier)
        {
            payload.identifier = data.identifier;
        }

        // Send it to the requests queue
        amqp.queue('requests').send(payload);
    });

    // Handle subscription
    spark.on('bazalt:subscribe', function(data) {

        // If there is an identifier, add it
        if('undefined' === typeof data.model)
        {
            return;
        }
    
        var room = token.application_id + '!' + data.model;

        spark.join(room);
    });

    // Handle unsubscription
    spark.on('bazalt:unsubscribe', function(data) {

        // If there is an identifier, add it
        if('undefined' === typeof data.model)
        {
            return;
        }

        var room = token.application_id + ':' + data.model;

        spark.leave(room);
    });
});
