const express = require('express'),
      morgan = require('morgan');
const app = express();

let toptenmovies = [{
  title: 'Test',
  director: 'Steven'
}]



app.use(express.static('public'));
app.use(morgan('common'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('We\'re going down!')
})


app.get('/movies', function(req, res) {
  res.json(toptenmovies);
})

app.get('/', function(req, res) {
  res.send('This is my text!');
})

app.listen(8080, () =>
  console.log('It\'s on 8080!'));
