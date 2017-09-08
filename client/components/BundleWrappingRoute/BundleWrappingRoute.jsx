import React from 'react';
import { Route } from 'react-router-dom';

import Bundle from '../Bundle/Bundle';

const innerWrapper = InnerWrappingComponent => props => (InnerComponent) => {
  return InnerWrappingComponent ? (<InnerWrappingComponent><InnerComponent {...props} /></InnerWrappingComponent>) : <InnerComponent {...props} />;
};

const BundleWrappingRoute = ({ load, component: InnerWrappingComponent, ...rest }) => (
  <Route {...rest} render={props => (<Bundle load={load}>{innerWrapper(InnerWrappingComponent)(props)}</Bundle>)} />
);

export default BundleWrappingRoute;
