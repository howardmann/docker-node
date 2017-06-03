var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var pg = require('pg');

var votes = {
  sandwiches: 0,
  tacos: 0
}

let client = new pg.Client('postgres://postgres@172.17.0.1:9000/postgres');

client.connect(function(err){
  if(err) throw err;
  client.query("select number_of_votes from votes where option_name='sandwiches'", function(err, result){
    if (err) throw err;
    votes.sandwiches = result.rows[0].number_of_votes;
  });
  client.query("select number_of_votes from votes where option_name='tacos'", function(err, result){
    if (err) throw err;
    votes.tacos = result.rows[0].number_of_votes;
  });
})

var urlencodedParser = bodyParser.urlencoded({extended:false});

var app = express();
app.set('views', __dirname + '/views');
// Express handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir: 'src/views/layouts'}));
app.set('view engine', 'handlebars');


// Routes
app.get('/', function (req, res, next) {
    res.render('home', {
      votes: votes
    });
});

app.post('/vote', urlencodedParser, function(req, res) {
  var vote = req.body.yourVote;
  if(vote === 'sandwiches') {
    votes.sandwiches = votes.sandwiches + 1;
    client.query('UPDATE votes set number_of_votes=' + votes.sandwiches + ' where option_name=\'sandwiches\'', function(err, result){
      if (err) throw err;
    })
  } else if(vote === 'tacos') {
    votes.tacos = votes.tacos + 1;
    client.query('UPDATE votes set number_of_votes=' + votes.tacos + ' where option_name=\'tacos\'', function(err, result){
      if (err) throw err;
    })
  } else {
    console.log('Something went wrong: vote contains ' + vote);
  }
  res.redirect('/');  
});

// 404
app.use(function(req, res){
  res.status(404).send('404');
});

// Listen on port 3000
app.listen(3000, function(){
  console.log('Listening port 3000');
});