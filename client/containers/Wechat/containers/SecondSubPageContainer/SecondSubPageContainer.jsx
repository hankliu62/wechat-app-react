import React from 'react';

import './SecondSubPageContainer.less';

const SecondSubPageContainer = (props) => {
  return (
    <div className="second-sub-page-wrapper">
      {props.children && props.children}
    </div>
  );
};

export default SecondSubPageContainer;
