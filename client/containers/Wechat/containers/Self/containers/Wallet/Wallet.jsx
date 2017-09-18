import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Wallet.less';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="self-wallet-wrapper">
        <WeuiHeader title="钱包" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        Wallet
      </div>
    );
  }
}

export default Wallet;
