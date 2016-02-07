/**
 * Created by samuelmoss on 2/4/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var pageNameProcessor = require('./page_processor.js')

console.log("Here is argv: ", process.argv[2]);

var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=links&format=json&iwurl=&titles=Kevin%20Bacon';

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)};
});
