import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import configureStore from './redux/configureStore';

const store = configureStore();

const app = (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
