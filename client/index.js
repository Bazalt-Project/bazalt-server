'use strict';

// Load Primus & Expose (Use require, or got Error with UMDish)
require('primus.js');

// Expose Bazalt
global.Bazalt = require('bazalt-client');
