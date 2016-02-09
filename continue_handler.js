var request = require('request');
var adjacencyList = require('./adjacency_list.js');
var pageProcessor = require('./string_processor.js');

var basicUrl = 'http://en.wikipedia.org/w/api.php?';
var queryAndFormat = 'action=query&prop=links&format=json&pllimit=500';
var returnedVals = '&iwurl=&titles=';
var times = 0;

module.exports = function continueApi(pageName, continueValue){
  request(basicUrl + queryAndFormat + continueValue + returnedVals + pageName,
    function (error, response, body) {
    if (!error && response.statusCode == 200) {
      times++;
      var parsedObject = JSON.parse(body)
      var pagesNumber = Object.keys(parsedObject.query.pages)[0];
      var links = parsedObject.query.pages[pagesNumber].links
      for(var i = 0; i < links.length; i++){
        adjacencyList[pageName].adjacencyList.push(links[i].title);
      };
      if(parsedObject.continue){
        var continueString = pageProcessor.continueFormatter(parsedObject.continue.plcontinue);
        console.log("Here is parsedObject.continue.plcontinue: ", times, parsedObject.continue);
        continueApi(pageName,continueString);
      } else {
        //console.log("Here is adjacencyList: ", adjacencyList);
      }
    };
  });
}
