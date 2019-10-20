import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';
import { access } from 'fs';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      newUser: null,
      users: [],
    };
  }



  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios.get('https://prescottflixapp.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  getMovies(token) {
    axios.get('https://prescottflixapp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null })
  }

  changeOutLook = () => {
    this.setState({ selectedMovie: null })
  }

  needToRegister = (newUser) => {
    this.setState({
      newUser
    });
  }

  onRegister = (user) => {
    this.setState({
      user
    })
  }


  render() {
    let { movies } = this.props;
    let { user } = this.state;

    // const { movies, selectedMovie, user, newUser, genreName, users, daToken } = this.state;



    //if (!user) return <RegistrationView onRegister={user => this.onRegister(user)} />;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <div className="main-view">
          <Route exact path="/client" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList user={user} movies={movies} />;
          }} />
          <Route path="client/register" render={() => <RegistrationView onRegister={user => this.onRegister(user)} />} />
          <Route path="client/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="client/genres/:Name" render={({ match }) => <GenreView genreType={match.params.Name} movies={movies} />} />
          <Route path="client/directors/:name" render={({ match }) => <DirectorView directorName={match.params.name} movies={movies} />} />

          <Route path="/profile" render={() => { if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; return <ProfileView movies={movies} />; }} />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);