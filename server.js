var express = require("express");
var Search = require("bing.search");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URI);

var app = express();

var search = new Search(process.env.BING_API_KEY);
var SearchHistory = mongoose.model('searchhistory', { term: String, when: String });

// get 10 latest searches
app.get("/latest", function(req, res) {
    console.log("get latest");
    SearchHistory.find().sort({when:1}).limit(10).exec(function(err, records) {
        if (err) console.log(err);

        var results = records.map(function(val) {
           return {
               "term": val.term, 
               "when": val.when
           } 
        });
        
        res.json(results);
    });
});

// search images
app.get("/:searchString", function(req, res) {
    console.log("search api");
    var query = req.params.searchString;
    var offset = req.query.offset || 10;
   
    var historyRecord = {
      "term": query,
      "when": new Date().toLocaleString()
    };
    
    if (query !== 'favicon.ico') {
      saveSearch(historyRecord);
    }
   
    search.images(req.params.searchString, {skip: offset}, function(err, results) {
        if (err) console.dir(err);
        var arrResults = results.map(makeRecord);
        res.json(arrResults);
    });
    
});

app.listen(port, function() {
    console.log("Listening on port " + port);
});

function saveSearch(history) {
    var sh = new SearchHistory(history);
    sh.save().then(function (err) {
      if (err) console.log(err);
      console.log('saved to db');
    });
    
}

function makeRecord(img) {
    return {
        "url": img.url,
        "snippet": img.title,
        "thumbnail": img.thumbnail.url,
        "context": img.sourceUrl
    }
}