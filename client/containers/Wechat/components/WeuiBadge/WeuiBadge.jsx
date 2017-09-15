import React from 'react';

import './WeuiBadge.less';

const WeuiBadge = props => (
  <i className={`weui-badge weui-badge-${props.type || 'dot'}`}>{ (props.type === 'count' ? props.count : '') || '' }</i>
);

export default WeuiBadge;
