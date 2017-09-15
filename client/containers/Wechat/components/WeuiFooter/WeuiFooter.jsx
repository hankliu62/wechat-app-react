import React from 'react';
import { NavLink } from 'react-router-dom';

import WeuiBadge from '../WeuiBadge/WeuiBadge';

import './WeuiFooter.less';

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

const WeuiFooter = props => (
  <footer className="weui-nav-footer">
    <nav className="weui-nav">
      {
        links.map((link, index) => (
          <NavLink key={index} className="nav" activeClassName="selected" to={link.url}>
            <dl>
              <dt className={`iconfont icon-${link.icon}`}>
                { index === 0 && (props.badgeCount || 12) ? (<WeuiBadge count={props.WeuiBadgeCount || 12} type="count" />) : '' }
                { index === 2 && props.newExplore ? (<WeuiBadge type="dot" />) : '' }
              </dt>
              <dd className="title">{link.title}</dd>
            </dl>
          </NavLink>
        ))
      }
    </nav>
  </footer>
);

export default WeuiFooter;
