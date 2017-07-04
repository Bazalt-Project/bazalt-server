/* global logger */
'use strict';

// Load dependencies
var Schema                        = require('bazalt-schema');
var Model                         = require('bazalt-model');
var BazaltQueryMongoDBTransformer = require('bazalt-query-node-mongodb-transformer');

// Load local dependencies
var ConnectionLoader = require('./connection-loader');

// Load models
var ApplicationSchema = require('../model/application-schema');
var DatabaseInstance  = require('../model/database-instance');


// Generic callback
var done = function(result, callback) {

    // Check for the validity of the callback
    if('function' === typeof callback)
    {
        callback(result);
    }
};

class SchemaLoader {

    constructor() {
        this.$__cache    = {};
        this.$__interval = 90;
        this.$__ttl      = 1800;

        // Set up the cleanner
        this.cleaner();
    }

    getApplicationCache(application, callback) {
        var self = this;
        
        // Define the next expiration date
        var expireDate = Date.now() + this.$__ttl * 1000;

        // Check for application cache
        if('undefined' === typeof this.$__cache[application])
        {
            // Initialize the cache for application
            this.$__cache[application] = {
                id:      application,
                schemas: {},
                expire:  expireDate,
                all:     false
            };
        }
        else
        {
            // Refresh expiration
            this.$__cache[application].expire = expireDate;
        }

        if('undefined' === typeof this.$__cache[application].database)
        {
            DatabaseInstance.findOne({
                application_id: application
            })
            .exec(function(err, databaseInstance) {
                if(err)
                {
                    logger.error(err);

                    return;
                }

                // Load the connection
                ConnectionLoader.connection(databaseInstance, function(connection) {
                    // Generate transformer Wrapper
                    var transformer = BazaltQueryMongoDBTransformer.transformer(connection);

                    // Save connection and transformer into the cache
                    self.$__cache[application].database    = databaseInstance;
                    self.$__cache[application].transformer = transformer

                    done(self.$__cache[application], callback);
                });
            });
        }
        else
        {
            done(this.$__cache[application], callback);
        }
    }

    save(cache, schema) {
        if('undefined' === typeof schema)
        {
            return;
        }
        else if(Array.isArray(schema))
        {
            for(let i in schema)
            {
                this.save(cache, schema[i]);
            }

            cache.all = true;

            return;
        }

        // Extract the name of the schema
        var name = schema.name;

        logger.info('SchemaLoader -', name , 'of', cache.id, 'has been loaded.');

        // Save the schema
        cache.schemas[name]             = schema;
        cache.schemas[name].model       = Model.generate(name, schema.definition);
        cache.schemas[name].transformer = cache.transformer;
    }

    application(application, callback) {
        var self = this;

        // Get the cache for the application
        this.getApplicationCache(application, function(applicationCache) {

            // Check for loading the schema in the cache
            if(true === applicationCache.all)
            {
                // Return from the cache
                done(applicationCache.schemas, callback);

                return;
            }

            ApplicationSchema.find({
                application_id: application
            })
            .exec(function(err, applicationSchemas) {
                if(err)
                {
                    logger.error(err);

                    return;
                }

                // Save schemas
                self.save(applicationCache, applicationSchemas);

                // Return from the cache
                done(applicationCache.schemas, callback);
            });
        });
    }

    schema(application, schema, callback) {
        var self = this;

        // Get the cache for the application
        this.getApplicationCache(application, function(applicationCache) {

            // Check for loading the schema in the cache
            if('undefined' !== typeof applicationCache.schemas[schema])
            {
                // Return from the cache
                done(applicationCache.schemas[schema], callback);

                return;
            }

            ApplicationSchema.findOne({
                application_id: application,
                name:           schema
            })
            .exec(function(err, applicationSchema) {
                if(err)
                {
                    logger.error(err);

                    return;
                }

                if('undefined' === typeof applicationSchema)
                {
                    logger.debug('SchemaLoader - No schema found for:', schema);

                    return;
                }

                // Save the schema
                self.save(applicationCache, applicationSchema);

                // Return from the cache
                done(applicationCache.schemas[schema], callback);
            });
        });
    }

    clean() {
        const referenceDate = Date.now();
        var counter = 0;

        // Parse the cache to remove unused application
        for(let application in this.$__cache)
        {
            if(referenceDate >= this.$__cache[application].expire)
            {
                delete this.$__cache[application];

                counter++;

                logger.info('SchemaLoader -', application, 'has been cleaned.');
            }
        }

        return counter;
    }

    cleaner() {
        logger.debug('SchemaLoader - Cleaning...');

        // Run the clean method
        this.clean();

        logger.debug('SchemaLoader - Cleaning done!');

        // Call back the cleaner
        this.$__timeoutId = setTimeout(this.cleaner.bind(this), this.$__interval * 1000);
    }
}

// Load a single instance
var loader = new SchemaLoader();

module.exports = loader;
