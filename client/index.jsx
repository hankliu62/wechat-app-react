import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store/configureStore';
import history from './libs/History';
import Routes from './routes/index';

import './less/index.less';

const routerHistory = syncHistoryWithStore(history, store);

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={routerHistory}>
        <Routes />
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

