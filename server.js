/**
 * Created by samuelmoss on 2/4/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var pageNameProcessor = require('./page_processer.js')
var adjacencyList = require('./adjacency_list.js');

//Takes in the second parameter as the name of the page to search for.
var rawPageName = process.argv[2]

//Converts the raw page name into one that can be used on the wiki API.
//i.e. kevin bacon => Kevin%20Bacon.
var processedPageName = pageNameProcessor(rawPageName);

var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&iwurl=&titles=Kevin%20Bacon';

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)};
});
