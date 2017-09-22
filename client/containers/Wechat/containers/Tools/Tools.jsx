import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import CheckRoute from '../../decorators/CheckRoute';
import { WECHAT_TOOLS_MENUS } from './contants/menu';

import './Tools.less';

@CheckRoute
class Tools extends Component {
  constructor(props) {
    super(props);

    this.checkIsSubRoute = this.checkIsSubRoute.bind(this);
  }

  render() {
    const { children } = this.props;

    return (
      <div className={classNames('tools-wrapper without-footer-wrapper', { 'with-sub-wrapper': this.checkIsSubRoute() })}>
        <div className="sub-main-wrapper tools-main-wrapper">
          <h1 className="title">Choose a tool</h1>
          <ul className="tools">
            {
              WECHAT_TOOLS_MENUS.map((menu, index) => (
                <li className="tool-item" key={index}>
                  <Link to={menu.link} className="menu">{`${index + 1}. ${menu.title}`}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        { children && children }
      </div>
    );
  }
}


export default Tools;
