import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

class OfficialAccounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="contact-official-accounts-wrapper">
        <WeuiHeader title="公众号" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)}>
          <i className="icon-header-operation iconfont icon-tips-jia" />
        </WeuiHeader>
        Official Accounts
      </div>
    );
  }
}

export default OfficialAccounts;
