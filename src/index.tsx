import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers';
import { Provider } from 'react-redux';

import './app/globalStyle/_reset.css'
import './app/globalStyle/_variables.css'
import './app/globalStyle/_global.css'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

