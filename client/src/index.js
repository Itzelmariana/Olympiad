import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
// const socket = io.connect("http://localhost:3002");
import io from 'socket.io-client';
import {
  getQueryParameter,
  getRandomString,
  updateQueryParameter,
} from './utils';

const room = getQueryParameter('room') || getRandomString(5);
let socket = io(`localhost:3002/?room=${room}`);

window.history.replaceState(
  {},
  document.title,
  updateQueryParameter('room', room),
);
socket.on('playerJoined', () => {
  console.log('playerJoined');
});
ReactDOM.render(


    <App />


  ,
  document.getElementById('root')
);

reportWebVitals();
