import React from 'react';
import './director-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';


function DirectorView(props) {
  const { movies, directorName } = props;

  if (!movies || !movies.length) return null;

  const cards = movies.map(m => {
    if (m.Director.Name === directorName) return <MovieCard key={m._id} movie={m} />
  });

  return (
    <div className="dir-movies-list">
      <div className="movie-list">
      </div>
      <div className="header">
        <h1>Nerdflix</h1>
        <Link className="the-x" to={'/'}>
          <ion-icon name="close"></ion-icon>
        </Link>
      </div>
      <div className="genre-title">
        <h2>{directorName} Films</h2>
      </div>
      <div>
        ${cards}
      </div>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(DirectorView);