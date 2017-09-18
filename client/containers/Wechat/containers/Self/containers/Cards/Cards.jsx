import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Cards.less';

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="self-cards-wrapper">
        <WeuiHeader title="卡包" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent" /></WeuiBack>)} />
        Cards
      </div>
    );
  }
}

export default Cards;
