var apiCall = require('api_call.js');

module.exports = function(pageName){
  if(pageName = 'Kevin Bacon'){
    console.log('Kevin Bacon found!');
  } else {
    apiCall.initialApi(pageName);
  }
}
