/**
 * The default configuration of Bazalt
 *
 * @author Tacyniak Boris <boris.tacyniak@free.fr>
 */

module.exports = {
    // The default port
    port: process.env.PORT || 1337,

    // Public assets of the site
    assets: {
        // The list of folders
        folders: 'public/',

        // Setup the max-age to 31 days
        maxAge: 31 * 24 * 60 * 60 * 1000
    },

    // Default configuration for queue messaging
    queue: {
        uri: 'amqp://development:password@bazalt-rabbitmq:5672/development'
    },

    // Default configuration for MongoDB Database
    mongodb: {
        // The connection URL for the database
        url: 'mongodb://bazalt-mongodb:27017/',

        // The options for the connection
        options: {}
    },

    // Default configuration for MySQL Database
    mysql: {
        // The Hostname for the database
        host: 'bazalt-mysql',

        // The user used for the connection
        user: 'bazalt',

        // Ths password of the user
        password: 'password',

        // The database name used
        database: 'bazalt'
    },

    // Default configuration for Redis Database
    redis: {
        // The Hostname for the database
        host: 'bazalt-redis'
    },

    // Default configuration for primus
    primus: {
        // Define if primus is runing by default
        enabled: true,

        // Primus port
        port: process.env.PORT || 8080,

        namespace: 'metroplex',

        // Use primus transformer
        transformer: 'sockjs'
    }
};