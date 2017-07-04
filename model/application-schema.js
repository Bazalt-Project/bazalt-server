'use strict';

var Model = require('bazalt-model');

// Local dependencies
var ApplicationSchemaSchema = require('../schema/application-schema');


// Define the Model for ApplicationSchema
const ApplicationSchema = Model.generate('application_schema', ApplicationSchemaSchema);


module.exports = ApplicationSchema;
