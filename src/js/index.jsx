import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
  test: () => null
});

function createClientStore(history) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    appReducer,
    composeEnhancer(applyMiddleware(
      thunk
    ))
  );
}


const root = document.getElementById('js-root');

if (root) {
  const store = createClientStore();

  ReactDOM.render(
    <Provider store={store}>
      <div>hey man</div>
    </Provider>, root);
}
