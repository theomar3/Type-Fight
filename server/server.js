var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var data = {};
// Connection URL
var mongoConnectionURL = 'mongodb://localhost:27017/myproject';


app.get('/player-progress/:id', function(req, res) {
  // if(data[req.params.id] === undefined){
  //
  //   data[req.params.id] = {
  //     wins : 0,
  //     losses: 0,
  //     difficultyChosen: ''
  //   }
  // }
  // console.log('get data', req.params.id);

  // Use connect method to connect to the Server
  MongoClient.connect(mongoConnectionURL, function(err, db) {
    // assert.equal(null, err);
    console.log('err', err);
    console.log("Connected correctly to server");

    findDocuments(db, function() {
      db.close();
      res.send({
        stats: data[req.params.id]
      });
    });

  });

  var findDocuments = function(db, callback) {
    //Get the documents collection
    var collection = db.collection('documents');
    //Find some documents
    collection.find({}).toArray(function(err, docs) {
      console.log('Found the following records');
      console.dir(docs);
      callback(docs);
    });
  }


});


app.post('/player-progress/:id', function(req, res) {
  // if(data[req.params.id] === undefined){
  //
  //   data[req.params.id] = {
  //     wins : 0,
  //     losses: 0,
  //     difficultyChosen: ''
  //   }
  // }
  //
  //
  // data[req.params.id].wins += Number(req.body.wins);
  // data[req.params.id].losses += Number(req.body.losses);
  // data[req.params.id].difficultyChosen = req.body.difficultyChosen;

  var dataToInsert = {
    wins: Number(req.body.wins),
    losses: Number(req.body.losses),
    difficultyChosen: req.body.difficultyChosen,
    userId: req.params.id
  }

  // Use connect method to connect to the Server
  MongoClient.connect(mongoConnectionURL, function(err, db) {
    // assert.equal(null, err);
    console.log('err', err);
    console.log("Connected correctly to server");

    insertDocuments(dataToInsert, db, function() {
      db.close();
      res.sendStatus(204);
    });
  });

console.log('post data', req.params.body);

});

var insertDocuments = function(dataToInsert ,db, callback) {
// Get the documents collection
var collection = db.collection('documents');
// Insert some documents
collection.insert(dataToInsert,
  function(err, result) {
  // assert.equal(err, null);
  // assert.equal(3, result.result.n);
  // assert.equal(3, result.ops.length);
  console.log("Added something");
  callback(result);
});
}

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log('listening on port', port);
});
