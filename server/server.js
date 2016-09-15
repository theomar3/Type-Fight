var express = require('express');
var app = express();

app.use(express.static('public'));



app.get('/api/progress', function(req, res) {
  res.send(
    {
      wins: winCount,
      losses: loseCount
    }
  );
});

var winCount = 0;
var loseCount = 0;

app.post('/api/progress', function(req, res) {
  res.sendStatus(204);
});

app.listen(5000, function() {
  console.log('listening on port 5000.');
});
