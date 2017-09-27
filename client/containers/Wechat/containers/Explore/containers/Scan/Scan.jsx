import React, { Component } from 'react';
import classNames from 'classnames';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import * as CONSTANTS from './constants/constants';

import './Scan.less';

class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scene: CONSTANTS.SCAN_SCENE_QRCODE
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

  renderBodyScanWrapper = () => {
    return (
      <div className="scanning-box">
        1
      </div>
    );
  }

  renderFooterScenesWrapper = () => {
    const scenes = [
      {
        type: CONSTANTS.SCAN_SCENE_QRCODE,
        icon: this.state.scene === CONSTANTS.SCAN_SCENE_QRCODE ? require('./images/scan-qrcode-actived.png') : require('./images/scan-qrcode-default.png'),
        title: '扫码'
      },
      {
        type: CONSTANTS.SCAN_SCENE_COVER,
        icon: this.state.scene === CONSTANTS.SCAN_SCENE_COVER ? require('./images/scan-cover-actived.png') : require('./images/scan-cover-default.png'),
        title: '封面'
      },
      {
        type: CONSTANTS.SCAN_SCENE_STREET,
        icon: this.state.scene === CONSTANTS.SCAN_SCENE_STREET ? require('./images/scan-street-actived.png') : require('./images/scan-street-default.png'),
        title: '街景'
      },
      {
        type: CONSTANTS.SCAN_SCENE_TRANSLATION,
        icon: this.state.scene === CONSTANTS.SCAN_SCENE_TRANSLATION ?
          require('./images/scan-translation-actived.png') : require('./images/scan-translation-default.png'),
        title: '翻译'
      }
    ];

    return (
      <ul className="content-footer-scenes">
        {
          scenes.map(scene => (
            <li className="content-footer-scene" key={scene.type} onClick={() => this.setState({ scene })}>
              <div className={classNames('scene-image', [`scene-image${scene.type}`], { actived: scene.type === this.state.scene })} />
              <div className="scene-title">{ scene.title }</div>
            </li>
          ))
        }
      </ul>
    );
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
          <div className="scan-content-footer">
            { this.renderFooterScenesWrapper() }
          </div>
        </div>
      </div>
    );
  }
}

export default Scan;
