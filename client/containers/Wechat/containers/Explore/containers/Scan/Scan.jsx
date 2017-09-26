import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './Scan.less';

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  componentDidMount() {
    const vendorUrl = window.URL || window.webkitURL;

    // 媒体对象
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getMedia({
      video: true, // 使用摄像头对象
      audio: false // 不适用音频
    }, (strem) => {
      this.video.src = vendorUrl.createObjectURL(strem);
      this.video.play();
    }, (error) => {
    // error.code
      console.log(error);
    });
  }

  render() {
    return (
      <div className="explore-scan-wrapper">
        <WeuiHeader
          title="二维码/条码"
          back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">发现</span></WeuiBack>)}
        >
          <p className="link-header-operation">相册</p>
        </WeuiHeader>
        <video className="scan-video" ref={el => this.video = el} />
        <div className="scan-content">
          <div className="scan-content-body">1</div>
          <div className="scan-content-footer">1</div>
        </div>
      </div>
    );
  }
}

export default Scan;
