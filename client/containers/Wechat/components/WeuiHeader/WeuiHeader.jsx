import React from 'react';

import './WeuiHeader.less';

const WeuiHeader = (props) => {
  return (
    <section className="weui-header">
      <div className="weui-header-back">{ props.back && props.back }</div>
      <div className="weui-header-title">{ props.title }</div>
      <div className="weui-header-operation">{ props.children }</div>
    </section>
  );
};

export default WeuiHeader;
