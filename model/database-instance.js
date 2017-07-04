'use strict';

var Model = require('bazalt-model');

// Local dependencies
var DatabaseInstanceSchema = require('../schema/database-instance');


// Define the Model for DatabaseInstance
const DatabaseInstance = Model.generate('database_instance', DatabaseInstanceSchema);

// Implements extra methods for DatabaseInstance
DatabaseInstance.methods({

    // Return the formated name of the database
    getDatabaseName() {
        return this.application_id + '!' + this.name;
    }
});

module.exports = DatabaseInstance;
