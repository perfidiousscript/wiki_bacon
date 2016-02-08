var chai = require("chai");
var assert = chai.assert;
var pageProcessor = require("../string_processor.js");

describe("Input Processor", function(){
  it("should work with a single word", function(){
    assert.equal(pageProcessor.inputCleanse('kevin'),'Kevin');
    assert.equal(pageProcessor.inputCleanse('Kevin'),'Kevin');
  })
  it("should work with two words", function(){
    assert.equal(pageProcessor.inputCleanse('kevin bacon'),'Kevin Bacon');
    assert.equal(pageProcessor.inputCleanse('Kevin Bacon'),'Kevin Bacon');
  })
});

describe("continue formatter", function(){
  it("should turn all pipes into the encoded characters", function(){
    assert.equal(pageProcessor.continueFormatter('|'),'&plcontinue=%7C');
    assert.equal(pageProcessor.continueFormatter('736|0|Action-angle_variables'),'&plcontinue=736%7C0%7CAction-angle_variables');
  })
});
