/* eslint-env browser */
/** eslint verified */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Eslint disallows JSX in .js files. But create-react-app only accepts index.js as entry point
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
    (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ),
    document.getElementById('root'),
  );