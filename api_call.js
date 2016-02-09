'use strict'
var request = require('request');
var adjacencyList = require('./adjacency_list.js');
var pageProcessor = require('./string_processor.js');
var continueApi = require('./continue_handler.js');
var module = module.exports = {};

var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json';
var returnedVals = '&iwurl=&titles=';
var queue = [];
var distance = 0;

module.initialApi = function(pageName){
  request(basicUrl + queryAndFormat + returnedVals + pageName,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedObject = JSON.parse(body)
      var pagesNumber = Object.keys(parsedObject.query.pages)[0];
      var links = parsedObject.query.pages[pagesNumber].links;
      adjacencyList[pageName] = {};
      adjacencyList[pageName].distance =
      adjacencyList[pageName].adjacencyList = [];
      for(var i = 0; i < links.length; i++){
        adjacencyList[pageName].adjacencyList.push(links[i].title);
        queue.push(links[i].title);
      };
      if(parsedObject.continue.plcontinue){
        var continueString = pageProcessor.continueFormatter(parsedObject.continue.plcontinue);
        continueApi(pageName,continueString);
      }
    };
  });
}
