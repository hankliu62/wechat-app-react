import React from 'react';
import classNames from 'classnames';

import './WeuiHeader.less';

const WeuiHeader = (props) => {
  return (
    <section className={classNames('weui-header', { [props.className]: !!props.className })}>
      <div className="weui-header-back">{ props.back && props.back }</div>
      <div className="weui-header-title">{ props.title }</div>
      <div className="weui-header-operation">{ props.children }</div>
    </section>
  );
};

export default WeuiHeader;
