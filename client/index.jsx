import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store/configureStore';
import history from './libs/History';
import Routes from './routes/index';

import './less/index.less';
import './less/abc.css';

const routerHistory = syncHistoryWithStore(history, store);

// import './scss/abc.css';

render(
  <Provider store={store}>
    <Router history={routerHistory}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

