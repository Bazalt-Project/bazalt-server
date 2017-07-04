'use strict';

var Schema = require('bazalt-schema');


// Define the Schema of Application
const Application = new Schema({
    name: {
        type: Schema.Types.String
    },
    description: {
        type: Schema.Types.String
    },
    domain: {
        type: Schema.Types.String
    }
});


module.exports = Application;
