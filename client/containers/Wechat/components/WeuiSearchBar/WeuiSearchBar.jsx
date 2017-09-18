import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';

import InputChange from '../../decorators/InputChange';

import './WeuiSearchBar.less';

@InputChange
class WeuiSearchBar extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    placeholder: '搜索',
    defaultValue: '',
    onCancel: () => {},
    onChange: () => {},
    onSubmit: () => {}
  }

  constructor(props) {
    super(props);

    const searchKey = `${uuid()}-search-text`;
    this.state = {
      focusing: !!props.defaultValue,
      clearing: !!props.defaultValue,
      [searchKey]: props.defaultValue,
      searchKey
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleFocusInput = () => {
    this.setState({ focusing: true });
  }

  handleBlurInput = () => {
    if (this.state[this.state.searchKey] === '') {
      this.setState({ focusing: false });
    }
  }

  handleCancelInput = () => {
    this.setState({ focusing: false, [this.state.searchKey]: '' });

    if (this.props.onChange()) {
      this.props.onChange('');
    }

    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleSubmitBar = (e) => {
    if (this.props.onSubmit) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      this.props.onSubmit(this.state[this.state.searchKey], e);
    }
  }

  render() {
    const { placeholder } = this.props;
    const { searchKey } = this.state;

    return (
      <div className={classNames('weui-search-bar', { focusing: this.state.focusing })}>
        <form className="search-form" onSubmit={this.handleSubmitBar}>
          <div className="search-form-box">
            <input
              id={searchKey}
              type="text"
              className="search-input"
              name={searchKey}
              placeholder={placeholder}
              value={this.state[searchKey]}
              rel={el => this.searchTextInput = el}
              onChange={this.handleChangeInput}
              onFocus={this.handleFocusInput}
              onBlur={this.handleBlurInput}
              autoComplete="off"
            />
            <i className="iconfont icon-search" />
          </div>
          <label className="search-form-label" htmlFor={searchKey}>
            <i className="iconfont icon-search" />
            <span className="label-content">{placeholder}</span>
          </label>
        </form>
        <a className="btn-cancel" onClick={this.handleCancelInput}>取消</a>
      </div>
    );
  }
}

export default WeuiSearchBar;
