const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./passport');
const { check, validationResult } = require('express-validator');


//---------------CORs---------------------//
var allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

//---------------------------------------------//

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://myFlixDBadmin:aq1SW@de3@myflixdb-gz5aj.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

const express = require('express'),
      morgan = require('morgan');
const app = express();

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var auth = require('./auth')(app);

app.use(express.static('public'));
app.use(morgan('common'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('We\'re going down!')
})


app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find().then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.get('/genres/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find({ "Genre.Name" : req.params.name })
  .then(function(movies) {
    res.json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.get('/directors/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find({ "Director.Name" : req.params.name })
  .then(function(movies) {
    res.json(movies)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.get('/users', passport.authenticate('jwt', {session: false}), function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],(req, res) => {

  // check the validation object for errors
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username }) // Search to see if a user with the requested username already exists
  .then(function(user) {
    if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username : req.body.Username,
        Password: hashedPassword,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
          console.error(error);
          res.status(500).send("Error: " + error);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

app.put('/users/:Username', passport.authenticate('jwt', {session: false}), function(req, res) {
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],(req, res) => {

  // check the validation object for errors
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : hashPassword,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  });
});

app.post('/users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true },
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

app.delete('users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});



var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
