/**
 * Created by samuelmoss on 2/4/16.
 */
'use strict'
var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var pageNameProcessor = require('./string_processor.js')
var continueHandler = require('./continue_handler.js');
var apiCall = require('./api_call.js');
var baconChecker = require('./bacon_checker.js');
var adjacencyList = require('./adjacency_list.js');

var queue = adjacencyList.queue;

//Takes in the second parameter as the name of the page to search for.
var rawPageName = process.argv[2];

//Converts the raw page name into one that can be used on the wiki API.
//i.e. kevin bacon => Kevin%20Bacon.
var processedPageName = pageNameProcessor.inputCleanse(rawPageName);

queue.push(processedPageName);

apiCall.initialApi(queue.shift());
