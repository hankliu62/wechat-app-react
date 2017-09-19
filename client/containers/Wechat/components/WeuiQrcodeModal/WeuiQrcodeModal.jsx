import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import WeuiModal from '../WeuiModal/WeuiModal';
import WeuiContactName from '../WeuiContactName/WeuiContactName';
import WeuiGender from '../WeuiGender/WeuiGender';

import './WeuiQrcodeModal.less';

const wechatModelDebug = debug('wechat:component');

class WeuiQrcodeModal extends Component {
  static propTypes = {
    qrcodeUrl: PropTypes.string.isRequired,
    headerUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    remark: PropTypes.string,
    gender: PropTypes.string,
    areas: PropTypes.array,
    isOpen: PropTypes.bool.isRequired,
    shouldCloseOnOverlayClick: PropTypes.bool,
    overlayStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnOverlayClick: true,
    overlayStyle: {},
    contentStyle: {},
    onRequestClose: () => {}
  }

  constructor(props) {
    super(props);

    wechatModelDebug('weui qrcode model init props:', props);
  }

  render() {
    const { areas, overlayStyle, contentStyle } = this.props;

    return (
      <WeuiModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
        contentLabel="Weui Qrcode Modal"
        contentStyle={contentStyle}
        overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.62)', ...overlayStyle }}
      >
        <div className="weui-qrcode-modal">
          <header className="qrcode-modal-header">
            <div className="profile-avatar">
              <img className="avatar" src={this.props.headerUrl} />
            </div>
            <div className="profile-content">
              <div className="content-base">
                <WeuiContactName nickname={this.props.nickname} remark={this.props.remark} />
                <WeuiGender gender={this.props.gender} />
              </div>
              { !!(areas && areas.length) && <div className="content-address">{ areas.join(' ') }</div> }
            </div>
          </header>
          <div className="qrcode-modal-body">
            <img className="profile-qrcode" src={this.props.qrcodeUrl} />
          </div>
          <footer className="qrcode-modal-footer">扫一扫上面的二维码图案，加我微信</footer>
        </div>
      </WeuiModal>
    );
  }
}


export default WeuiQrcodeModal;
