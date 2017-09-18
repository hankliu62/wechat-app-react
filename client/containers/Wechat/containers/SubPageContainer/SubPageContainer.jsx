import React from 'react';

import './SubPageContainer.less';

const SubPageContainer = (props) => {
  return (
    <div className="sub-page-wrapper">
      {props.children && props.children}
    </div>
  );
};

export default SubPageContainer;
