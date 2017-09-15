import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

    this.state = {
      focusing: !!props.defaultValue,
      clearing: !!props.defaultValue,
      searchText: props.defaultValue
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  handleFocusInput = () => {
    this.setState({ focusing: true });
  }

  handleBlurInput = () => {
    if (this.state.searchText === '') {
      this.setState({ focusing: false });
    }
  }

  handleCancelInput = () => {
    this.setState({ focusing: false, text: '' });

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

      this.props.onSubmit(this.state.text, e);
    }
  }

  render() {
    const { placeholder } = this.props;

    return (
      <div className={classNames('weui-search-bar', { focusing: this.state.focusing })}>
        <form className="search-form" onSubmit={this.handleSubmitBar}>
          <div className="search-form-box">
            <input
              id="searchText"
              type="text"
              className="search-input"
              name="searchText"
              placeholder={placeholder}
              value={this.state.searchText}
              rel={el => this.searchTextInput = el}
              onChange={this.handleChangeInput}
              onFocus={this.handleFocusInput}
              onBlur={this.handleBlurInput}
              autoComplete="off"
            />
            <i className="iconfont icon-search" />
          </div>
          <label className="search-form-label" htmlFor="searchText">
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
