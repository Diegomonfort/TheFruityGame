import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import Logo from "../../assets/logoWhite.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RegisterComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerData = {
      name: name,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const data = await response.json();

        dispatch(setUser({ name: name, id: data.id }));

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

  const navTo = () => {
    navigate('/login');
  };

  return (
    <div className='authContainer'>
      <img src={Logo} width={"150px"} alt="Logo" />
      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
        <span className='spanAuth'>
          Already have an account? <b onClick={navTo}>Sign in</b>
        </span>
      </form>

      {error && <span className='errorMessage'><FontAwesomeIcon icon={faXmark} /> {error}</span>}
    </div>
  );
};

export default RegisterComp;
