'use strict';

primus.on('disconnection', function(spark) {

    // Extract token
    var token = spark.request.token || {};

    logger.debug('Disconnection from ApiToken[%s] with Spark[%s]', token.token, spark.id);
});
