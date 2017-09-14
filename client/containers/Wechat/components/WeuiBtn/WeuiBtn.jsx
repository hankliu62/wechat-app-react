import React from 'react';
import classNames from 'classnames';

import './WeuiBtn.less';

const WeuiBtn = (props) => {
  const extendClassName = {};
  const extendKeys = ['theme', 'size'];
  for (const key of extendKeys) {
    const content = props[key] || '';
    extendClassName[`weui-btn-${content}`] = !!content;
  }

  const onClick = props.onClick || (() => {});

  return (
    <div className={classNames('weui-btn', extendClassName)} onClick={onClick}>
      {props.children && props.children}
    </div>
  );
};

export default WeuiBtn;
