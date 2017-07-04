'use strict';

var Model = require('bazalt-model');

// Local dependencies
var ApplicationSchema = require('../schema/application');


// Define the Model for Application
const Application = Model.generate('application', ApplicationSchema);


module.exports = Application;
