import React from 'react';

import './NewMsg.less';

const NewMsg = props => (
  <i className={`new-msg new-msg-${props.type || 'dot'}`}>{ (props.type === 'count' ? props.count : '') || '' }</i>
);

export default NewMsg;
