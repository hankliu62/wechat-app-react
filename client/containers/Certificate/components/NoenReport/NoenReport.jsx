import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NoenReport.less';

class NoenReport extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
  }

  static defaultProps = {
    isOpen: false,
    onHide: () => {}
  }

  componentDidMount = () => {
    // Has to use mousedown to work with map pan and click
    document.addEventListener('mousedown', this.onClickDocument);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.onClickDocument);
  }

  onClickDocument = (event) => {
    const isClickOutside = !this.isChildOf(event.target, this.refRoot);
    if (isClickOutside) {
      this.props.onHide();
    }
  }

  isChildOf = (child, parent) => {
    if (child.parentNode === parent) {
      return true;
    }

    if (child.parentNode === null) {
      return false;
    }

    return this.isChildOf(child.parentNode, parent);
  }

  render() {
    const { isOpen } = this.props;

    return (
      <div ref={refRoot => this.refRoot = refRoot} className={classNames('noenreport-modal', { 'm-show': isOpen, 'm-hidden': isOpen })}>
        <div className="modal-content">
          该备案表尚无对应的英文版，
          <a href="http://www.chsi.com.cn/xlcx/rhsq.jsp#rhsqxl_en" className="nr-detail">如何申请</a>
        </div>
        <div className="modal-footer clearfix">
          <span className="modal-action modal-close btn-flat" onClick={this.props.onHide}>关闭</span>
        </div>
      </div>
    );
  }
}

export default NoenReport;
