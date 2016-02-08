'use strict'
var request = require('request');
var adjacencyList = require('./adjacency_list.js');
var module = module.exports = {};

var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json';
var returnedVals = '&iwurl=&titles=';

module.initialApi = function(pageName){
  request(basicUrl + queryAndFormat + returnedVals + pageName,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var convertedObject = JSON.parse(body)
      var pagesNumber = Object.keys(convertedObject.query.pages)[0];
      var links = convertedObject.query.pages[pagesNumber].links
      adjacencyList[pageName] = {};
      adjacencyList[pageName].adjacencyList = [];
      adjacencyList[pageName].adjacencyList.push(links);
      console.log(convertedObject);
      // if(convertedObject.continue.plcontinue !=='||'){
      //   continueApi(pageName,convertedObject.continue.plcontinue)
      // }
    };
  });
}

function continueApi(pageName, continueValue){
  request(basicUrl + queryAndFormat + continueValue + returnedVals + pageName,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var convertedObject = JSON.parse(body)
      var pagesNumber = Object.keys(convertedObject.query.pages)[0];
      var links = convertedObject.query.pages[pagesNumber].links
      adjacencyList[pageName].adjacencyList.push(links);
      if(convertedObject.continue.plcontinue !=='||'){
        continueApi(pageName,convertedObject.continue.plcontinue)
      } else {
        console.log("Here is adjacencyList: ", adjacencyList);
      }
    };
  });
}
