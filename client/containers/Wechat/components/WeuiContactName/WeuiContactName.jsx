import React from 'react';

const WeuiContactName = (props) => {
  return (
    <p className="weui-contact-name">{props.remark || props.nickname}</p>
  );
};

export default WeuiContactName;
