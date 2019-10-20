import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://prescottflixapp.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user' + e)
      });
  };

  const nowRegister = (newUser) => {
    props.needToRegister(newUser);
  }



  return (
    <div className="big-view">
      <div className="title">
        <h1>Nerdflix</h1>
      </div>
      <div className="the-box">
        <div className="box-title">
          <h2>Login</h2>
        </div>
        <div className="the-form">
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label></Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label></Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="the-btn" variant="primary" type="submit" onClick={handleSubmit}>
              Submit
              </Button>
          </Form>
        </div>
        <h4>Are you new?</h4>
        <p>
          <Link to={'/register'}>
            <span>Register here</span>
          </Link>
        </p>
      </div>
    </div>
  );
}