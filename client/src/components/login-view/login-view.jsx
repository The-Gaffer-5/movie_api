import React, { useState } from 'react';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const nowRegister = (newUser) => {
    props.needToRegister(newUser);
  }



  return (
    <div>
      <form>
        <label>
          <h1>LOGIN!</h1>
          Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
      <h4>Are you new?</h4>
      <button type="button" onClick={nowRegister}>Register</button>
    </div>
  );
}