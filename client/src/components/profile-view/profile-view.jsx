import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   username: null,
    //   password: null,
    //   email: null,
    //   birthday: null,
    //   userData: null,
    //   favoriteMovies: [],
    // }
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
        window.open('/', '_self');
      })
      .catch(event => {
        alert('failed to delete user');
      });
  }

  removeFaveMovie(favMovie) {
    console.log({ favMovie })
    axios.delete(`https://prescottflixapp.herokuapp.com/users/${localStorage.getItem('user')}/FavoriteMovies/${favMovie}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        console.log(response)
      })
      .catch(event => {
        alert('Oops... something went wrong...');
      });
  }

  render() {
    const { userMe, movies } = this.props
    if (!userMe) return null;
    if (!movies) return null;
    console.log(userMe.FavoriteMovies)
    console.log(movies);

    return (
      <div>
        <h1>Profile</h1>
        {userMe.Username}
        {userMe.Birthday}
        {userMe.Email}
        <div>
          {movies.map(m => {
            if (
              m._id === userMe.FavoriteMovies.find(fav => fav === m._id)
            ) {
              return (
                <div>
                  My Favorite Movies:
                  {m.Title}
                  <Button onClick={() => this.removeFaveMovie(m._id)}>Delete</Button>
                </div>
              )
            }
          })}
        </div>
        <Button onClick={() => this.unRegister()}> UnRegister </Button>
      </div>
    )
  }
}