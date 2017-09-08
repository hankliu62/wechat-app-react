import React from 'react';

import NavFooter from '../../components/NavFooter/NavFooter';

import './Container.less';

const Container = props => (
  <div className="wechat-container">
    {props.children && props.children}
    <NavFooter {...props} />
  </div>
);

export default Container;
