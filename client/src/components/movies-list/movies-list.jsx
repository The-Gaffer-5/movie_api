import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, user } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />
  return <div className="movies-list">
    <div className="movie-list">
    </div>
    <div className="header">
      <div className="profile-link">
        <Link to={`/profile`}>
          <Button variant="link">{user}</Button>
        </Link>
      </div>
      <h1>Nerdflix</h1>
      <div className="the-filter">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </div>
      <div className="mag"><ion-icon name="search"></ion-icon></div>
    </div>
    {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
  </div>
}

export default connect(mapStateToProps)(MoviesList);



