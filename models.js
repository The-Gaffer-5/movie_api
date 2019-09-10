const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title : {type: String, required: true},
  Description : {type: String, required: true},
  Genre : {
    Name : String,
    Description : String
  },
  Director : {
    Name : String,
    Bio : String
  },
  Actors : [String],
  ImagePath : String,
  Featured : Boolean
});

var userSchema = mongoose.Schema({
 Username : {type: String, },
 Password : {type: String, },
 Email : {type: String, },
 Birthday : Date,
 FavoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
