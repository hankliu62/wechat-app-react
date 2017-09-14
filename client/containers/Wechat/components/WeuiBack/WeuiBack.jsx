import React, { Component } from 'react';

import './WeuiBack.less';

class WeuiBack extends Component {
  onClickBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="weui-back iconfont icon-return-arrow" onClick={this.onClickBack}>
        {this.props.children && this.props.children}
      </div>
    );
  }
}

export default WeuiBack;
