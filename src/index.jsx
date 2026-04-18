import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AudioProvider } from './features/audio/AudioProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <HelmetProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </HelmetProvider>
    </React.StrictMode>
  </Router>
);
