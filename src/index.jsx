// @flow strict

import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const root = document.getElementById('js-root');

if (root) {
  ReactDOM.render(<App />, root);
}
