import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';


import './Collect.less';

class Collect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="self-collect-wrapper">
        <WeuiHeader title="收藏" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        Collect
      </div>
    );
  }
}

export default Collect;
