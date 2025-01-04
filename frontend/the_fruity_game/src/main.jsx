import React from 'react';
import ReactDOM from 'react-dom/client';

import './components/Home_Component/home.css';
import './components/Game/game.css';
import './components/Auth/login.css';
import './components/Leadboard/leadboard.css';
import './components/Sessions/sessions.css';
import './app.css';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);