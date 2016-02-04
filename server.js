/**
 * Created by samuelmoss on 2/4/16.
 */
var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var app = express();


var url = process.argv[2];

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

        var title, release, rating;
        var json = { title : "", release : "", rating : ""};
        $('#firstHeading').filter(function(){
            var data =$(this);

            title = data.text();
            json.title = title;
            console.log(json);
        })
    } else {
        console.log(error);
    }
});


app.listen('8081');

console.log('Listening on port 8081');

exports = module.exports = app;