import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './styles/global.css';
import { AuthProvider } from './context/Auth.jsx';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);