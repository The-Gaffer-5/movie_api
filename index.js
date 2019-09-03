const express = require('express'),
      morgan = require('morgan');
const app = express();

let movies = [{
  title: 'Test',
  director: 'Steven'
}]



app.use(express.static('public'));
app.use(morgan('common'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('We\'re going down!')
})


app.get('/movies', (req, res) => {
  res.json(movies);
})

app.get('/movies/:name', (req, res) => {
  res.send("All data about 1 film");
})

app.get('/genres/:name', (req, res) => {
  res.send("All films with this genre");
})

app.get('/directors/:name', (req, res) => {
  res.send("Info about this Director");
})

app.post('/users', (req, res) => {
  res.send("Register a new user");
})

app.put('/users/:name', (req, res) => {
  res.send("Update user info")
})

app.post('/mylist', (req, res) => {
  res.send("Add film to my favorites list")
})

app.delete('/mylist/:name', (req, res) => {
  res.send("Remove a film from my favorites list")
})

app.delete('/users/:name', (req, res) => {
  res.send("User Unregistered")
})



app.get('/', function(req, res) {
  res.send('This is my text!');
})

app.listen(8080, () =>
  console.log('It\'s on 8080!'));
