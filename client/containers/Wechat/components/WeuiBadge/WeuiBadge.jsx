import React from 'react';

import './WeuiBadge.less';

const getContent = (props) => {
  if (+props.count) {
    if (props.type === 'count') {
      if (props.ellipsis && +props.count > 99) {
        return '...';
      }

      return props.count;
    }
  }

  return '';
};

const WeuiBadge = props => (
  <i className={`weui-badge weui-badge-${props.type || 'dot'}`}>{ getContent(props) }</i>
);

export default WeuiBadge;
