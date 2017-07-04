'use strict';

var Schema = require('bazalt-schema');


// Define the Schema of a Database Instance
const DatabaseInstance = new Schema({
    application_id: {
        type: Schema.Types.Guid
    },
    name: {
        type: Schema.Types.String
    },
    description: {
        type: Schema.Types.String
    },
    hostname: {
        type: Schema.Types.String
    },
    port: {
        type: Schema.Types.Number,
        min: 1,
        max: 65535
    },
    username: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String
    }
});


module.exports = DatabaseInstance;
