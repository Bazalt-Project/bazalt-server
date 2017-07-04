'use strict';

var Schema = require('bazalt-schema');


// Define the Schema of ApiToken
const ApiToken = new Schema({
    application_id: {
        type: Schema.Types.Guid
    },
    token: {
        type: Schema.Types.String
    },
    roles: {
        type: Schema.Types.String
    }
});


module.exports = ApiToken;
