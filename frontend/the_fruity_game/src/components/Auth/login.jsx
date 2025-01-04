import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';

import Logo from "../../assets/logoWhite.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const LoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      name: name,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
      
        
        dispatch(setUser({ name: name, message: data.message }));
      
        
        localStorage.setItem('user', JSON.stringify({ name: name, id: data.id }));
      
        
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        console.log('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setError('There was a problem with the connection. Try later.');
    }
  };

  const navTo = () =>{
    navigate('/register');
  }

  return (
    <div className='authContainer'>
      <img src={Logo} width={"150px"} />
      <form onSubmit={handleLogin}>
        <div className="inputsAuth">
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
        </div>
        
        <button type="submit">Login</button>
        <span className='spanAuth'>Don´t have an account? <b onClick={navTo}>Sign up</b></span>
      </form>

      
      {error && <span className='errorMessage'><FontAwesomeIcon icon={faXmark} /> {error}</span>}
    </div>
  );
};

export default LoginComp;
