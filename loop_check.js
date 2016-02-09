var list = require('adjacencyList')
var list = adjacencyList.list;
var queue = adjacencyList.queue;

function loopCheck(pageName){
  if(pageName===list[pageName]){
    var nextHit = queue.shift();
    baconCheck(nextHit.name,nextHit.distance);
  }
}

module.exports = loopCheck;
