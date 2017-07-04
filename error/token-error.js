'use strict';

/**
 * Represent an Error about a token
 *
 * @author Tacyniak Boris
 * @version 0.0.0
 * @since 0.0.0
 */
class TokenError extends Error {

    /**
     * The constructor is use to define default value
     * or accept parameters
     *
     * @param token The message of the error
     * @param message The message of the error
     *
     * @constructor
     */
    constructor(token, message) {
        // Format the message
        message = message.replace('{token}', token);

        super(message);

        Error.captureStackTrace(this);

        this.message = message;
        this.token   = token;
    }

    /**
     * Return the message of the error
     * 
     * @return string
     */
    toString() {
        return this.message;
    }
}

module.exports = TokenError;
