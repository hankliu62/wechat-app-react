import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavFooter.less';

const links = [
  {
    url: '/wechat/homepage',
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

const NavFooter = () => (
  <footer className="wx-nav-footer">
    <nav className="wx-nav">
      {
        links.map((link, index) => (
          <NavLink key={index} className="nav" activeClassName="selected" to={link.url}>
            <dl>
              <dt className={`iconfont icon-${link.icon}`} />
              <dd className="title">{link.title}</dd>
            </dl>
          </NavLink>
        ))
      }
    </nav>
  </footer>
);

export default NavFooter;
