var express = require('express');
var bodyParser = require('body-parser');

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
  res.send({
    stats: data[req.params.id]
  });

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



  res.sendStatus(204);

});

var port = process.env.PORT || 5000
app.listen(port, function() {
  console.log('listening on port', port);
});
