import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom';

import App from './containers/App';

const app = (
  <HashRouter>
    <App />
  </HashRouter>
);

ReactDOM.render(app, document.getElementById('root'));
