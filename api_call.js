'use strict'
var request = require('request');
var adjacencyList = require('./adjacency_list.js');
var pageProcessor = require('./string_processor.js');
var centralModule = require('./server.js');
var baconCheck = require('./bacon_checker.js')

var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json&pllimit=500';
var returnedVals = '&iwurl=&titles=';
var list = adjacencyList.list;
var queue = adjacencyList.queue;
var isMeta = /\:/;

var initialApi = function(pageName, lastDistance){
  request(basicUrl + queryAndFormat + returnedVals + pageName,
    function (error, response, body) {
      var currentDistance = lastDistance + 1;
      if (!error && response.statusCode == 200) {
      var parsedObject = JSON.parse(body)
      var pagesNumber = Object.keys(parsedObject.query.pages)[0];
      var links = parsedObject.query.pages[pagesNumber].links;
      list[pageName] = {};
      list[pageName].adjacencyList = [];
      console.log("parsedObject query: ", parsedObject.query);
      if(links){
        for(var i = 0; i < links.length; i++){
        if(!(links[i].title.match(isMeta))){
          list[pageName].adjacencyList.push(links[i].title);
          queue.push({
            name: links[i].title,
            distance: currentDistance
          });
      };
    };
  } else {
    var nextHit = queue.shift();
    baconCheck(nextHit.name,nextHit.distance);
  }
  if(parsedObject.continue){
      var continueString = pageProcessor.continueFormatter(parsedObject.continue.plcontinue);
      continueApi(pageName, continueString, lastDistance)
    } else {
      var nextHit = queue.shift();
      baconCheck(nextHit.name,nextHit.distance);
    }
      }
    })
  }

var continueApi = function (pageName, continueValue,lastDistance){
    request(basicUrl + queryAndFormat + continueValue + returnedVals + pageName,
      function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var currentDistance = lastDistance + 1;
        var parsedObject = JSON.parse(body)
        var pagesNumber = Object.keys(parsedObject.query.pages)[0];
        var links = parsedObject.query.pages[pagesNumber].links
        if(links){
          for(var i = 0; i < links.length; i++){
            if(!(links[i].title.match(isMeta))){
              list[pageName].adjacencyList.push(links[i].title);
              queue.push(
                {
                name: links[i].title,
                distance: currentDistance
              });
            }
          };
        } else {
          var nextHit = queue.shift();
          baconCheck(nextHit.name,nextHit.distance);
        }
        if(parsedObject.continue){
          var continueString = pageProcessor.continueFormatter(parsedObject.continue.plcontinue);
          continueApi(pageName, continueString, lastDistance)
          return continueString;
        } else {
          var nextHit = queue.shift();
          baconCheck(nextHit.name,nextHit.distance);
        }
      };
    });
  }




module.exports.initialApi = initialApi;
