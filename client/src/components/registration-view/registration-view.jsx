import React, { useState } from 'react';
import axios from 'axios';


export function RegistrationView(props) {
  const [username, regUsername] = useState('');
  const [password, regPassword] = useState('');
  const [email, regEmail] = useState('');
  const [birthday, regBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    axios.post('https://prescottflixapp.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
    /* then call props.onLoggedIn(username) */
    props.onRegister(username);
  };







  return (
    <form>
      <label>
        <h1>REGISTER!</h1>
        Username:
        <input type="text" value={username} onChange={e => regUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => regPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => regEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="text" value={birthday} onChange={e => regBirthday(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Register</button>
    </form >
  );
}