import React, { useState } from 'react';


export function RegistrationView(props) {
  const [username, regUsername] = useState('');
  const [password, regPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
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
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}