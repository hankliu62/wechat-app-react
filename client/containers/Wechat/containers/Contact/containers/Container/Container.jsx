import React from 'react';

import './Container.less';

const Container = (props) => {
  return (
    <div className="contact-sub-wrapper">
      {props.children && props.children}
    </div>
  );
};

export default Container;
