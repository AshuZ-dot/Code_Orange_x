import React, { useState } from 'react';
import axios from 'axios';
import QuestionSolver from './QuestionSolver';
import QuesSelector from './QuesSelector.js';
import './login.css'
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/log_in', {
        user_name: userName,
        password: password,
      });

      if (response.status === 200) {
        // Login successful
        setLoggedIn(true);


        setUserId(userName); // Replace 'userId' with the actual key in the response JSON
      } else {
        // Handle other status codes if necessary
        console.log('Login failed');
      }
    } catch (error) {
      // Handle error
      console.log('Login failed:', error);
      setErrorMessage('Internal server error');
    }
  };

  if (loggedIn) {

    return <QuesSelector user_id={userName} />;
  }

  return (
    <div className='container'>
      <div className='left_log'>

        <div className='left_child'>

          {errorMessage && <p>{errorMessage}</p>}
          <form onSubmit={handleFormSubmit}>
            <div>
              <h3>Log in</h3>
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={handleUserNameChange}
                className='input_text'
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className='input_text'
              />
            </div>
            <button type="submit" className='lg_btn'>Log in</button>
          </form>
        </div>
      </div>

      <div className='right_log'>
        <h1>Code Orange</h1>
        <p>Here you can Practice Your Coding skills using C++</p>
      </div>

    </div>

  );
};

export default Login;
