import React, { Component } from 'react';
import classNames from 'classnames';

import InputChange from '../../decorators/InputChange';

import './WeuiSearchBar.less';

@InputChange
class WeuiSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
      searchText: ''
    };

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onFocusInput = () => {
    console.log('1232132132');
    this.setState({ isFocus: true });
  }

  onBlurInput = () => {
    this.setState({ isFocus: false });
  }

  render() {
    return (
      <div className={classNames('weui-search-bar', { focusing: this.state.isFocus })}>
        <form className="search-form">
          <div className="search-form-box">
            <input
              id="searchText"
              type="text"
              className="search-input"
              name="searchText"
              placeholder="搜索"
              value={this.state.searchText}
              rel={el => this.searchTextInput = el}
              onChange={this.onChangeInput}
              onFocus={this.onFocusInput}
              onBlur={this.onBlurInput}
            />
            <i className="iconfont icon-search" />
          </div>
          <label className="search-form-label" htmlFor="searchText">
            <i className="iconfont icon-search" />
            <span className="label-content">搜索</span>
          </label>
        </form>

        <a className="btn-cancel">取消</a>
      </div>
    );
  }
}

export default WeuiSearchBar;
