var express = require('express');
var app = express();

app.use(express.static('public'));

var data = [];



app.get('/api/progress', function(req, res) {
  res.send(data);
});

app.post('/api/progress', function(req, res) {
  data.push({
    wins: req.body.wins,
    losses: req.body.losses
  });
  res.send(204);

});

app.listen(5000, function() {
  console.log('listening on port 5000.');
});
