import React from 'react';

import './WcHeader.less';

const WcHeader = (props) => {
  return (
    <section className="wc-header">
      <div className="wc-header-back" />
      <div className="wc-header-title">{ props.title }</div>
      <div className="wc-header-operation">{ props.children }</div>
    </section>
  );
};

export default WcHeader;
