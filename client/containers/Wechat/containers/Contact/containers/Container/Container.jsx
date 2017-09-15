import React from 'react';

import './Container.less';

const Container = (props) => {
  return (
    <div className="sub-wrapper-contact">
      {props.children && props.children}
    </div>
  );
};

export default Container;
