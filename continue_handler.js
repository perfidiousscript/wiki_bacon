var request = require('request');
var adjacencyList = require('./adjacency_list.js');
var pageProcessor = require('./string_processor.js');
var baconChecker = require('./bacon_checker');

var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json&pllimit=500';
var returnedVals = '&iwurl=&titles=';

var list = adjacencyList.list;
var queue = adjacencyList.queue;

var isMeta = /\:/;
var continueString = "";

var continueApi = function (pageName, continueValue,lastDistance){
  continueString = "";
  request(basicUrl + queryAndFormat + continueValue + returnedVals + pageName,
    function (error, response, body) {
      console.log('continue is hit');
    if (!error && response.statusCode == 200) {
      var parsedObject = JSON.parse(body)
      var pagesNumber = Object.keys(parsedObject.query.pages)[0];
      var links = parsedObject.query.pages[pagesNumber].links
      for(var i = 0; i < links.length; i++){
        if(!(links[i].title.match(isMeta))){
          list[pageName].adjacencyList.push(links[i].title);
          queue.push(
            {
            name: links[i].title,
            distance: lastDistance+=1
          });
        }
      };
      if(parsedObject.continue){
        continueString = pageProcessor.continueFormatter(parsedObject.continue.plcontinue);
        console.log('there is a continue string and it is: ', continueString)
        return continueString;
      } else {
        console.log(list[pageName].adjacencyList);
      }
    };
  });
}

exports.call = continueApi;
module.exports.continueString = continueString
