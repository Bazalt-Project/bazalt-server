/* global global, __dirname */
'use strict';

// Load dependencies
var Primus        = require('primus');
var PrimusRooms   = require('primus-rooms');
var PrimusCluster = require('primus-cluster');
var Metroplex     = require('metroplex');
var OmegaSupreme  = require('omega-supreme');

// Include local files
var configuration = require('../configuration.js');

// Add redis to the options
configuration.redis = global.redis;
configuration.cluster = {
    redis: global.redis
};

// Instantiate primus
global.primus = new Primus(global.server, configuration.primus);

// Add messaging plugin
global.primus.use('omega-supreme', OmegaSupreme);

// Enable clustering
global.primus.use('metroplex', Metroplex);

// Enable Primus Rooms
global.primus.use('rooms', PrimusRooms);

// Enable Primus cluster from rooms
global.primus.use('cluster', PrimusCluster);


// Save the primus client file
global.primus.save(__dirname + '/../client/primus.js');