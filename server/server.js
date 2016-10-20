
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

var app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var data = {};
// Connection URL
var mongoConnectionURL =
 process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';



app.get('/player-progress/', function(req, res) {


  // Use connect method to connect to the Server
  MongoClient.connect(mongoConnectionURL, function(err, db) {
    // assert.equal(null, err);
    console.log('err', err);
    console.log("Connected correctly to server");

    findDocuments({}, db, function(docs) {
      db.close();
      res.send(docs);
    });

  });



});

app.get('/player-progress/:id', function(req, res) {

  var userId = req.params.id;

  // Use connect method to connect to the Server
  MongoClient.connect(mongoConnectionURL, function(err, db) {
    // assert.equal(null, err);
    console.log('err', err);
    console.log("Connected correctly to server");

    var parameters = {
      userId: userId
    };

    findDocuments(parameters, db, function(docs) {
      db.close();
      res.send(docs);
    });

  });



});

var findDocuments = function(parameters, db, callback) {
  //Get the documents collection
  var collection = db.collection('stats');
  //Find some documents
  collection.find(parameters).toArray(function(err, docs) {
    console.log('Found the following records');
    console.dir(docs);
    callback(docs);
  });
}


app.post('/player-progress/:id', function(req, res) {

  var dataToInsert = {
    wins: Number(req.body.wins),
    losses: Number(req.body.losses),
    difficultyChosen: req.body.difficultyChosen,
    userId: req.params.id
  }

  var query = {
    userId: req.params.id,
    difficultyChosen: req.body.difficultyChosen
  }

  // Use connect method to connect to the Server
  MongoClient.connect(mongoConnectionURL, function(err, db) {
    // assert.equal(null, err);
    console.log('err', err);
    console.log("Connected correctly to server");

    updateDocuments(query, dataToInsert, db, function() {
      db.close();
      res.sendStatus(204);
    });
  });

console.log('post data', req.params.body);

});

var insertDocuments = function(dataToInsert ,db, callback) {
// Get the documents collection
var collection = db.collection('stats');
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

var updateDocuments = function(query, dataToChange, db, callback) {
  var collection = db.collection('stats');

  var dataToIncrement = {
    $inc: {
      wins: dataToChange.wins,
      losses: dataToChange.losses
    }
  }
  console.log('data to increment', dataToIncrement);

  collection.update(query, dataToIncrement, db, function(err, mongoResult) {
    console.log('query', query);
    console.log('err', err);
    console.log('nModified', mongoResult.result.nModified);
    if(mongoResult != undefined) {
      if(mongoResult.result.nModified === 0) {
        insertDocuments(dataToChange, db, callback);
      }
      else {
        callback(mongoResult);
      }
    }

  });

}

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log('listening on port', port);
});
