import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss'

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  render() {

    const { movie } = this.props;


    if (!movie) return null;

    return (
      <div className="movie-view">
        <div className="header">

          <h1>Nerdflix</h1>
          <Link className="the-x" to={'/'}>
            <ion-icon name="close"></ion-icon>
          </Link>
        </div>
        <img className="movie-poster" src={movie.imageURL} />
        <div className="movie-info">
          <div className="movie-title">
            <div className="value">{movie.Title}</div>
          </div>
          <div className="movie-description">
            <div className="value">{movie.Description}</div>
          </div>
          <div className="movie-genre">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </div>
          <div className="movie-director">
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>
        </div>
      </div>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  // onClick: PropTypes.func.isRequired
};