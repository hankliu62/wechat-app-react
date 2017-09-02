import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store from './store/configureStore';
import history from './libs/History';
import Routes from './routes/index';

import './less/index.less';

//  const routerHistory = syncHistoryWithStore(history, store);

// import './scss/abc.css';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
