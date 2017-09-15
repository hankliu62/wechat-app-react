import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './WeuiSubPage.less';

const WeuiSubPage = (props) => {
  return (
    <ReactCSSTransitionGroup
      component="div"
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {props.children && props.children}
    </ReactCSSTransitionGroup>
  );
};

export default WeuiSubPage;
