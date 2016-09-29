var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var data = {};

app.get('/player-progress/:id', function(req, res) {
  if(data[req.params.id] === undefined){

    data[req.params.id] = {
      wins : 0,
      losses: 0,
      difficultyChosen: ''
    }
  }
  console.log('get data', req.params.id);

  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    // assert.equal(null, err);
    console.log('err', err);
    console.log("Connected correctly to server");

    insertDocuments(db, function() {
      db.close();
      res.send({
        stats: data[req.params.id]
      });
    });

  });

  var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert({a : 1},
    function(err, result) {
    // assert.equal(err, null);
    // assert.equal(3, result.result.n);
    // assert.equal(3, result.ops.length);
    console.log("Added something");
    callback(result);
  });
}


});


app.post('/player-progress/:id', function(req, res) {
  if(data[req.params.id] === undefined){

    data[req.params.id] = {
      wins : 0,
      losses: 0,
      difficultyChosen: ''
    }
  }


  data[req.params.id].wins += Number(req.body.wins);
  data[req.params.id].losses += Number(req.body.losses);
  data[req.params.id].difficultyChosen = req.body.difficultyChosen;


console.log('post data', req.params.body);
  res.sendStatus(204);

});

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log('listening on port', port);
});
