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

  handleSubmit(event, theMovie) {
    event.preventDefault();
    axios.post(`https://prescottflixapp.herokuapp.com/users/${localStorage.getItem('user')}/FavoriteMovies/${theMovie._id}`, {
      Username: localStorage.getItem('user')
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Movie has been added to your Favorite List!');
      })
      .catch(event => {
        console.log('error adding movie to list');
        alert('Oops... Something went wrong!');
      });
  };
  render() {
    const { movie } = this.props;

    return (
      <div className="cards" id="cardID">
        <div className="overlay"></div>
        <img className="the-img" src={movie.imageURL} alt="movie images" />
        <div className="text-area">
          <Link className="the-link" to={`/movies/${movie._id}`}>
            <h1>{movie.Title}</h1>
          </Link>
          <h5 className="the-genre">Genre: {movie.Genre.Name}<br></br>Director: {movie.Director.Name}</h5>
          <h4 className="the-heart" onClick={event => this.handleSubmit(event, movie)}>
            <ion-icon name="heart"></ion-icon>
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