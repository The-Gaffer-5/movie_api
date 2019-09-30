import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './movie-card.scss'
import axios from 'axios';


export class MovieCard extends React.Component {
  constructor() {
    super();
  }


  AddtoFavs(theMovie) {
    console.log(theMovie)
    console.log(theMovie._id)
    event.preventDefault();
    console.log(localStorage.getItem('token'))
    axios.post(`https://prescottflixapp.herokuapp.com/users/${localStorage.getItem('user')}/FavoriteMovies/${theMovie._id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response)
        alert(`${theMovie.Title}: Added To Favorites`);
      })
      .catch(event => {
        console.log(event)
        alert(`${theMovie.Title}: NOT added To Favorites`);
      });
  }
  render() {
    const { movie } = this.props;

    return (
      <div className="cards" id="cardID">
        <img src={movie.imageURL} alt="movie images" />
        <div className="text-area">
          <Link to={`/movies/${movie._id}`}>
            <h1>{movie.Title}</h1>
          </Link>

          <h3>{movie.Genre.Name}</h3>
          <h4 onClick={() => this.AddtoFavs(movie)}>
            Add to Favorites
          </h4>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};