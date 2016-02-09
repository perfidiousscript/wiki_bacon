var request = require('request');
var adjacencyList = require('./adjacency_list.js');
var pageProcessor = require('./string_processor.js');
var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json&pllimit=500';
var returnedVals = '&iwurl=&titles=';

var list = adjacencyList.list;
var queue = adjacencyList.queue;

var isMeta = /\:/;

module.exports = function continueApi(pageName, continueValue){
  request(basicUrl + queryAndFormat + continueValue + returnedVals + pageName,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedObject = JSON.parse(body)
      var pagesNumber = Object.keys(parsedObject.query.pages)[0];
      var links = parsedObject.query.pages[pagesNumber].links
      for(var i = 0; i < links.length; i++){
        if(!(links[i].title.match(isMeta))){
          list[pageName].adjacencyList.push(links[i].title);
          queue.push(links[i].title);
        }
      };
      if(parsedObject.continue){
        var continueString = pageProcessor.continueFormatter(parsedObject.continue.plcontinue);
        continueApi(pageName,continueString);
      } else {
        console.log("Here is adjacencyList: ", list[pageName].adjacencyList);
      }
    };
  });
}
