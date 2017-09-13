import React from 'react';
import { Route } from 'react-router-dom';

import Bundle from '../Bundle/Bundle';

const innerWrapper = InnerWrappingComponent => ChildrenComponent => props => (InnerComponent) => {
  return InnerWrappingComponent ? (
    <InnerWrappingComponent>
      <InnerComponent {...props}>
        { ChildrenComponent && ChildrenComponent(props) }
      </InnerComponent>
    </InnerWrappingComponent>) :
    (<InnerComponent {...props}>
      { ChildrenComponent && ChildrenComponent(props) }
    </InnerComponent>);
};

const BundleWrappingRoute = ({ load, component: InnerWrappingComponent, children: ChildrenComponent, ...rest }) => (
  <Route {...rest} render={props => (<Bundle load={load}>{innerWrapper(InnerWrappingComponent)(ChildrenComponent)(props)}</Bundle>)} />
);

export default BundleWrappingRoute;
