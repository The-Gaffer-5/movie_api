import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

import './profile-view.scss'

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      FavoriteMovies: [],
    }
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //get user
  getUser(token) {
    let daUsername = localStorage.getItem('user');
    axios.get(`https://prescottflixapp.herokuapp.com/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        response.data.find(u => {
          if (u.Username === daUsername) {
            this.setState({
              username: u.Username,
              password: u.Password,
              email: u.Email,
              birthday: u.Birthday,
              userData: u,
              FavoriteMovies: u.FavoriteMovies
            });
          }
        })
      })
      .catch(function (error) {
        console.log('errors', error);
      });
  }

  unRegister() {
    axios.delete(`https://prescottflixapp.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        alert('Your Account has been deleted!');
        //clears storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //opens login view
        window.open('/client/', '_self');
      })
      .catch(event => {
        alert('failed to delete user');
      });
  }

  handleSubmit(event, theMovie) {
    event.preventDefault();
    axios.delete(`https://prescottflixapp.herokuapp.com/users/${localStorage.getItem('user')}/FavoriteMovies/${theMovie}`, {
      Username: localStorage.getItem('user')
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        window.location.reload();
        alert('Movie has been removed from your Favorite List!');
      })
      .catch(event => {
        console.log('error removing movie from list');
        alert('Oops... Something went wrong!');
      });
  };

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null })
    window.open('/client', '_self');
  }


  render() {
    const { userMe, movies } = this.props

    return (
      <div className="prof-view-whole">
        <div className="header">
          <h1>Nerdflix</h1>
        </div>
        <div className="profile-view">
          <Link className="the-x" to={'/'}>
            <ion-icon name="close"></ion-icon>
          </Link>
          <Button className="unregister" onClick={() => this.unRegister()}> (unregister) </Button>
          <h1>{this.state.username}</h1>
          <h2>Birthday: {this.state.birthday}</h2>
          <h2>Email: {this.state.email}</h2>
          <div className="favorites">
            <h2>My Favorite Movies: </h2>
            {movies.map(m => {
              if (
                m._id === this.state.FavoriteMovies.find(fav => fav === m._id)
              ) {
                return (
                  <div className="each-fav">
                    <h3>{m.Title}</h3>
                    <Button className="remove-btn" onClick={(event) => this.handleSubmit(event, m._id)}>(remove)</Button>
                  </div>
                )
              }
            })}
          </div>
          <Button className="logout" onClick={() => this.logOut()}> Logout </Button>
        </div >
      </div>
    )
  }
}