import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Setting.less';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="self-setting-wrapper">
        <WeuiHeader title="设置" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        Setting
      </div>
    );
  }
}

export default Setting;
