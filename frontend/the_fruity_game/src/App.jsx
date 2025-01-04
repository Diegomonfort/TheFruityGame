import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Leadboard from './pages/Leadboard';
import Game from './pages/Game';
import Sessions from './pages/Sessions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leadboard" element={<Leadboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </Router>
  );
};

export default App;
