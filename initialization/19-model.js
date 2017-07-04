'use strict';

var Model            = require('bazalt-model');
var QueryTransformer = require('bazalt-model-query-transformer');


// Add the Query Transformer as default transformer
Model.transformer(QueryTransformer);

