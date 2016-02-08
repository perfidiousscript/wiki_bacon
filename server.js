/**
 * Created by samuelmoss on 2/4/16.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
var pageNameProcessor = require('./page_processer.js')
var adjacencyList = require('./adjacency_list.js');
var continueHandler = require('./continue_handler.js');

//Takes in the second parameter as the name of the page to search for.
var rawPageName = process.argv[2]

//Converts the raw page name into one that can be used on the wiki API.
//i.e. kevin bacon => Kevin%20Bacon.
var processedPageName = pageNameProcessor(rawPageName);

var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json';
var returnedVals = '&iwurl=&titles=';

initialApi = function(pageName){
  request(basicUrl + queryAndFormat + returnedVals + pageName,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var convertedObject = JSON.parse(body)
      var pagesNumber = Object.keys(convertedObject.query.pages)[0];
      adjacencyList[pageName] = {};
      adjacencyList[pageName].adjacencyList = [];
      //adjacencyList[pageName].adjacencyList.push(body.query.pages)
      console.log("Here is links: ",convertedObject.query.pages[pagesNumber]);
    };
  });
}

initialApi(processedPageName);
