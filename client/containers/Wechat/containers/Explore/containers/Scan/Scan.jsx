import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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

    this.sceneOptions = {
      [CONSTANTS.SCAN_SCENE_QRCODE]: {
        headerTitle: '二维码/条码',
        headerOperation: '相册',
        bodyTitle: '将二维码/条码放入框内, 即可自动扫描'
      },
      [CONSTANTS.SCAN_SCENE_COVER]: {
        headerTitle: '封面/电影海报',
        bodyTitle: '讲书、CD、电影海报放入框内, 即可自动扫描'
      },
      [CONSTANTS.SCAN_SCENE_STREET]: {
        headerTitle: '街景',
        bodyTitle: '扫一下周边环境, 即可自动扫描'
      },
      [CONSTANTS.SCAN_SCENE_TRANSLATION]: {
        headerTitle: '翻译',
        bodyTitle: '将英文单词放入框内'
      }
    };
  }

  componentDidMount() {
    const vendorUrl = window.URL || window.webkitURL;

    // 媒体对象
    const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    getUserMedia({
      video: false, // 使用摄像头对象
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
    const { scene } = this.state;
    const sceneOption = this.sceneOptions[scene];

    return (
      <div className="scanning-wrapper">
        <div className={classNames('scanning-box', `scanning-box-${scene}`)}>
          <span className="scanning-line" />
          <span className="left-top" />
          <span className="right-top" />
          <span className="left-bottom" />
          <span className="right-bottom" />
        </div>
        <div className="scanning-desc">
          <p className="scanning-desc-info">{sceneOption.bodyTitle}</p>
          { scene === CONSTANTS.SCAN_SCENE_QRCODE && <Link className="personal-qrcode" to="/wechat/self/profile/qrcode">我的二维码</Link> }
        </div>
      </div>
    );
  }

  renderFooterScenesWrapper = () => {
    const scenes = [
      {
        type: CONSTANTS.SCAN_SCENE_QRCODE,
        title: '扫码'
      },
      {
        type: CONSTANTS.SCAN_SCENE_COVER,
        title: '封面'
      },
      {
        type: CONSTANTS.SCAN_SCENE_STREET,
        title: '街景'
      },
      {
        type: CONSTANTS.SCAN_SCENE_TRANSLATION,
        title: '翻译'
      }
    ];

    return (
      <ul className="content-footer-scenes">
        {
          scenes.map(scene => (
            <li className="content-footer-scene" key={scene.type} onClick={() => this.setState({ scene: scene.type })}>
              <div className={classNames('scene-image', [`scene-image-${scene.type}`], { actived: scene.type === this.state.scene })} />
              <div className={classNames('scene-title', { actived: scene.type === this.state.scene })}>{ scene.title }</div>
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { scene } = this.state;
    const sceneOption = this.sceneOptions[scene];

    return (
      <div className="explore-scan-wrapper">
        <WeuiHeader
          title={sceneOption.headerTitle}
          back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">发现</span></WeuiBack>)}
        >
          { sceneOption.headerOperation && <p className="link-header-operation">{ sceneOption.headerOperation }</p> }
        </WeuiHeader>
        <video className="scan-video" ref={el => this.video = el} />
        <div className="scan-content">
          <div className="scan-content-body">
            { this.renderBodyScanWrapper() }
          </div>
          <div className="scan-content-footer">
            { this.renderFooterScenesWrapper() }
          </div>
        </div>
      </div>
    );
  }
}

export default Scan;
