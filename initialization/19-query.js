/* global global */
'use strict';

var Query                 = require('bazalt-query');
var QueryMySQLTransformer = require('bazalt-query-node-mysql-transformer');

// Attach the connection to the Transformer and get the transformer Wrapper
var transformer = QueryMySQLTransformer.transformer(global.pool);

// Attach the transformer on the Query
Query.transformer(transformer);
