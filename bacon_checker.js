var apiCall = require('./api_call.js');
var queue = require('./adjacency_list').queue;


module.exports = function(pageName, distance){
  if(pageName === 'Kevin Bacon'){
    console.log('Your page has a bacon number of', distance);
    return ('Your page has a Bacon number of', distance)
  } else {
    apiCall.initialApi(pageName,distance);
  }
}
