/* global primus, logger */
'use strict';

var Roles      = require('../constants/roles');
var ApiToken   = require('../model/api-token');
var TokenError = require('../error/token-error');

primus.authorize(function (req, callback) {

    // Wrap logging into a function
    var done = function(error) {
        // Check for error
        if(error)
        {
            // Log only in debug in TokenError
            if(true === error instanceof TokenError)
            {
                logger.debug(error.message);
            }
            else
            {
                logger.error(error.message, error.stack);
            }
        }

        callback(error);
    };

    try
    {
        // Get the token send by the client
        var token = ((req || {}).query || {}).token;
        
        ApiToken.findOne({
            token: token
        }).exec(function(err, apiToken) {
            if(err)
            {
                return done(err);
            }

            if(!apiToken)
            {
                return done(
                    new TokenError(token, 'No ApiToken found for {token}.')
                );
            }

            // Check if allowed to connect
            if(false === apiToken.hasRole(Roles.CONNECT))
            {
                return done(
                    new TokenError(token, 'The ApiToken[{token}] is not authorized to connect.')
                );
            }
            
            // Save roles in the request
            req.token = apiToken;

            return done();
        });
    }
    catch(err)
    {
        return done(err);
    }
});
