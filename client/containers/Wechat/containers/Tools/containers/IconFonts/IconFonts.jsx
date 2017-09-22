import React from 'react';
import classNames from 'classnames';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

import './IconFonts.less';

const IconFonts = (props) => {
  const iconfonts = [
    'tips-jia',
    'return-arrow',
    'tips-add-friend',
    'chat-set',
    'mute',
    'tips-xiaoxi',
    'chat-person',
    'chat-friends',
    'more',
    'tips-saoyisao',
    'wechat',
    'me',
    'dialogue-jia',
    'tips-fukuan',
    'contact',
    'find',
    'chat-group',
    'chat-detail-add',
    'dialogue-voice',
    'dialogue-jianpan',
    'dialogue-smile',
    'dialogue-bar-jianpan',
    'dialogue-bar-menu',
    'search',
    'iphone-address'
  ];


  return (
    <div className="tools-iconfonts-wrapper">
      <WeuiHeader title="IconFonts" back={(<WeuiBack history={props.history}><span className="weui-back-centent">Tools</span></WeuiBack>)} />
      <ul className="iconfonts-wrapper">
        {
          iconfonts.map((fonticon, index) => {
            return (
              <li className="iconfont-wrapper" key={index}>
                <i className={classNames('iconfont', `icon-${fonticon}`)} />
                <span className="iconfont-content">{ `icon-${fonticon}` }</span>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default IconFonts;
