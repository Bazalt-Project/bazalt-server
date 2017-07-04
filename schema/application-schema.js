'use strict';

var Schema = require('bazalt-schema');


// Define the Schema of ApplicationSchema
const ApplicationSchema = new Schema({
    application_id: {
        type: Schema.Types.Guid
    },
    name: {
        type: Schema.Types.String
    },
    definition: {
        type: Schema.Types.String
    }
});


module.exports = ApplicationSchema;
