import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Album.less';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="self-album-wrapper">
        <WeuiHeader title="相册" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        Album
      </div>
    );
  }
}

export default Album;
