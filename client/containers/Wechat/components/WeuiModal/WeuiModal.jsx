import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import debug from 'debug';

const wechatModelDebug = debug('wechat:component');

class WeuiModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    shouldCloseOnOverlayClick: PropTypes.bool,
    contentLabel: PropTypes.string.isRequired,
    overlayStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnOverlayClick: true,
    overlayStyle: {},
    contentStyle: {},
    onRequestClose: () => {},
    className: ''
  }

  constructor(props) {
    super(props);

    wechatModelDebug('weui model init props:', props);
  }

  render() {
    const style = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        ...this.props.overlayStyle
      },
      content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '.1rem',
        outline: 'none',
        padding: '.5rem',
        ...this.props.contentStyle
      }
    };

    return (
      <ReactModal
        className={this.props.className}
        isOpen={this.props.isOpen}
        closeTimeoutMS={300}
        onRequestClose={this.props.onRequestClose}
        style={style}
        contentLabel={this.props.contentLabel}
        shouldCloseOnOverlayClick={this.props.shouldCloseOnOverlayClick}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}


export default WeuiModal;
