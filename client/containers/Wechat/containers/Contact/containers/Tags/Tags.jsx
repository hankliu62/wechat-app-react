import React from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

const Tags = (props) => {
  return (
    <div className="contact-tags-wrapper">
      <WeuiHeader title="标签" back={(<WeuiBack history={props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)} />
      Contact Tags
    </div>
  );
};

export default Tags;
