/* global logger, primus, amqp */
'use strict';

// Consume the responses queue
amqp.queue('responses').consume(function(err, response, accept, reject) {
    if(err)
    {
        return reject();
    }

    logger.debug('New Response', response);

    // Get the sparks target and application
    var sparks = response.sparks;

    // Remove spark from response
    delete response.sparks;

    // The response is forwarded
    primus.sparks(sparks, response, function(error, result) {
        if(error)
        {
            logger.error(error.message);
        }

        logger.debug('Forward result:', result);

        // The response is accepted
        accept();
    });
});
