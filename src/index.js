import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TopicsProvider } from './Contexts/Topics';
import { UserProvider } from './Contexts/CurrentUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
    <TopicsProvider>
      <App />
    </TopicsProvider>
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);