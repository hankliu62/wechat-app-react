import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import Routes from './routes.jsx';
import DeviceUtils from '../utils/DeviceUtils';

const AppRouter = DeviceUtils.browser.ie && (DeviceUtils.browser.ie <= 8) ? HashRouter : BrowserRouter;

export default () => (
  <AppRouter>
    <Routes />
  </AppRouter>
);
