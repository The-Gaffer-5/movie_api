import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
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
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
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
    //console.log(this.props)
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, newUser, genreName, users, daToken } = this.state;



    if (!user && newUser) return <RegistrationView onRegister={user => this.onRegister(user)} />;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user && !newUser) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} needToRegister={newUser => this.needToRegister(newUser)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/genres/:Name" render={({ match }) => movies.map(m => { if (m.Genre.Name === match.params.Name) return <GenreView key={m._id} movie={m} /> })} />
          <Route path="/directors/:name" render={({ match }) => movies.map(m => { if (m.Director.Name === match.params.name) return <DirectorView key={m._id} movie={m} /> })} />

          <Route path="/profile" render={() => <ProfileView movies={movies} userMe={users.find(u => u.Username === user)} />} />
        </div>
      </Router>
    );
  }
}