import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import ElementUtil from '../../../../utils/ElementUtil';

import './WeuiActionSheet.less';

class WeuiActionSheet extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    cells: PropTypes.array.isRequired,
    onChoose: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    isOpen: false,
    onChoose: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };
  }

  componentDidMount() {
    if (this.props.isShow) {
      document.addEventListener('click', this.handleClickDocument, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      ElementUtil.addClassName(document.documentElement, 'weui-action-aheet-opensing');
      document.addEventListener('click', this.handleClickDocument, false);
    } else {
      document.removeEventListener('click', this.handleClickDocument, false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickDocument, false);
  }

  handleClickDocument = (e) => {
    if (ElementUtil.isChildOf(e.target, this.menuBox)) {
      return;
    }

    if (!this.props.isOpen) {
      return;
    }

    ElementUtil.removeClassName(document.documentElement, 'weui-action-aheet-opensing');
    this.props.onClose();
  }

  handleClickCell = (e, cell) => {
    if (e) {
      e.stopPropagation();
    }

    if ('clickable' in cell && !cell.clickable) {
      return;
    }

    this.props.onChoose(cell.value, cell);
  }

  render() {
    const { cells, isOpen } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className="weui-actionsheet">
        <div className="weui-mask" />
        <div className="weui-actionsheet-menu" ref={el => this.menuBox = el}>
          {
            cells && cells.map((cell, index) => {
              return (
                <div className="weui-actionsheet-cell" key={index} onClick={e => this.handleClickCell(e, cell)}>
                  <div className="weui-actionsheet-cell-content">{ cell.text }</div>
                </div>
              );
            })
          }
          {
            !!this.props.onCancel &&
              <div className="weui-actionsheet-cell cancel-cell" onClick={this.props.onCancel}>
                <div className="weui-actionsheet-cell-content">取消</div>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default WeuiActionSheet;
