import React from 'react';
import { NavLink } from 'react-router-dom';

import NewMsg from '../NewMsg/NewMsg';

import './WcFooter.less';

const links = [
  {
    url: '/wechat/chat',
    icon: 'wechat',
    title: '微信'
  },
  {
    url: '/wechat/contact',
    icon: 'contact',
    title: '通讯录'
  },
  {
    url: '/wechat/explore',
    icon: 'find',
    title: '发现'
  },
  {
    url: '/wechat/self',
    icon: 'me',
    title: '我'
  }
];

const NavFooter = props => (
  <footer className="wc-nav-footer">
    <nav className="wc-nav">
      {
        links.map((link, index) => (
          <NavLink key={index} className="nav" activeClassName="selected" to={link.url}>
            <dl>
              <dt className={`iconfont icon-${link.icon}`}>
                { index === 0 && props.newMsgCount ? (<NewMsg count={props.newMsgCount} type="count" />) : '' }
                { index === 2 && props.newExplore ? (<NewMsg type="dot" />) : '' }
              </dt>
              <dd className="title">{link.title}</dd>
            </dl>
          </NavLink>
        ))
      }
    </nav>
  </footer>
);

export default NavFooter;
