import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Expression.less';

class Expression extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="self-expression-wrapper">
        <WeuiHeader title="表情" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        Expression
      </div>
    );
  }
}

export default Expression;
