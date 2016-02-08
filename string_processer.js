module = module.exports = {};

module.inputCleanse = function(pageName){
  var wordArray = pageName.split(" ");
  var upperWordArray = wordArray.map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1,word.length).toLowerCase();
  });
  var returnString = upperWordArray.join(' ');
  return returnString;
};

module.continueFormatter = function(dirtyString){
  return dirtyString.replace(/\|/g,'%7C');
};
