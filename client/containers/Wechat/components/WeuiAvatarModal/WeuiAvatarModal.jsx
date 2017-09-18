import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import WeuiModal from '../WeuiModal/WeuiModal';

import './WeuiAvatarModal.less';

const wechatModelDebug = debug('wechat:component');

class WeuiAvatarModal extends Component {
  static propTypes = {
    headerUrl: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnOverlayClick: true,
    onRequestClose: () => {}
  }

  constructor(props) {
    super(props);

    wechatModelDebug('weui avatar model init props:', props);
  }

  render() {
    return (
      <WeuiModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        shouldCloseOnOverlayClick
        contentLabel="Weui Avatar Modal"
        overlayStyle={{ backgroundColor: '#000', zIndex: '98' }}
        contentStyle={{ width: '100%', padding: '0', background: '#000', border: '0' }}
        className="react-modal-content-avatar"
      >
        <div className="weui-avatar-modal">
          <img className="avatar" src={this.props.headerUrl} />
        </div>
      </WeuiModal>
    );
  }
}


export default WeuiAvatarModal;
