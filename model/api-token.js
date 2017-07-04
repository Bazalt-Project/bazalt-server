'use strict';

var Model = require('bazalt-model');

// Local dependencies
var ApiTokenSchema = require('../schema/api-token');


// Define the Model for ApiToken
const ApiToken = Model.generate('api_token', ApiTokenSchema);

// Implements extra methods for ApiToken
ApiToken.methods({

    // Return true if the token has the role
    hasRole(role) {
        // No role by default
        var roles = [];

        // Check roles not null
        if('string' === typeof this.roles)
        {
            // Extract roles
            roles = this.roles.split(' ');
        }

        return -1 !== roles.indexOf(role);
    }
});

module.exports = ApiToken;
