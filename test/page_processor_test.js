var chai = require("chai");
var assert = chai.assert;
var pageProcessor = require("../page_processer.js");

describe("Page Processor", function(){
  it("should work with a single word", function(){
    assert.equal(pageProcessor('kevin'),'Kevin');
    assert.equal(pageProcessor('Kevin'),'Kevin');
  })
  it("should work with two words", function(){
    assert.equal(pageProcessor('kevin bacon'),'Kevin Bacon');
    assert.equal(pageProcessor('Kevin Bacon'),'Kevin Bacon')
  })
});
