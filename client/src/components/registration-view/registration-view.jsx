import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './registration-view.scss'

export function RegistrationView(props) {
  const [username, regUsername] = useState('');
  const [password, regPassword] = useState('');
  const [email, regEmail] = useState('');
  const [birthday, regBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://prescottflixapp.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        alert('Great! Now just log in.');
      })
      .catch(e => {
        console.log('error registering the user')
      });
    /* then call props.onLoggedIn(username) */
    props.onRegister(username);
  };

  return (
    <div className="big-view">
      <div className="title">
        <h1>Nerdflix</h1>
      </div>
      <div className="the-box">
        <div className="box-title">
          <h2>Register</h2>
        </div>

        <div className="the-form">
          <Form>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control type="text" placeholder="Username (At least 5 characters)" value={username} onChange={e => regUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => regPassword(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control type="email" placeholder="Email Address" value={email} onChange={e => regEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control type="text" placeholder="Birthday (example 01.01.2000)" value={birthday} onChange={e => regBirthday(e.target.value)} />
            </Form.Group>
            <Button className="the-btn" type="button" onClick={handleSubmit}>Register</Button>
          </Form >
          <p>
            <Link to={'/'}>
              <span>Go Back</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}