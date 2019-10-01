import React from 'react';
import './genre-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';


function GenreView(props) {
  const { movies, genreType } = props;

  if (!movies || !movies.length) return null;

  const cards = movies.map(m => {
    if (m.Genre.Name === genreType) return <MovieCard key={m._id} movie={m} />
  });

  return (
    <div className="movies-list">
      <div className="movie-list">
      </div>
      <div className="header">

        <h1>Nerdflix</h1>
        <Link className="the-x" to={'/'}>
          <ion-icon name="close"></ion-icon>
        </Link>
      </div>
      <div className="genre-title">
        <h2>{genreType} Films</h2>
      </div>
      <div>
        ${cards}
      </div>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(GenreView);