/* eslint-env browser */
/** eslint verified */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// TODO: Habilitar registerServiceWorker cuando esté habilitado el dominio en HTTPS
// import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
