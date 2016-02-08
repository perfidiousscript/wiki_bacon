module.exports = function(pageName){
  var wordArray = pageName.split(" ");
  var upperWordArray = wordArray.map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1,word.length).toLowerCase();
  });
  var returnString = upperWordArray.join(' ');
  return returnString;
};
