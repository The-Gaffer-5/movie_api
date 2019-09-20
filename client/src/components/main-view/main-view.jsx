import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }


  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://prescottflixapp.herokuapp.com/movies')
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://prescottflixapp.herokuapp.com/movies', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.Username
    });
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
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && !newUser) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} needToRegister={newUser => this.needToRegister(newUser)} />;

    if (!user && newUser) return <RegistrationView onRegister={user => this.onRegister(user)} />;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} headBack={() => this.changeOutLook()} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}