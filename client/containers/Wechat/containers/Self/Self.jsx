import React from 'react';

import WcHeader from '../../components/WcHeader/WcHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';

import qrcode from './images/qrcode.png';

import './Self.less';

const HeaderCellContent = props => (
  <div className="header-cell-center">
    <h4 className="self-nickname">{props.nickname}</h4>
    <p className="self-wxid">{props.wxid}</p>
  </div>
);

const Self = () => {
  const headerCells = [{
    className: 'weui-cell-access header-weui-cell',
    image: 'https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxgeticon?seq=653390029&username=@8743b54354ce913e4e4b51386c56f777&skey=@crypt_c36b3ee7_c79965b68ed2895a56ca7becc33f966c',
    link: '/wechat/self/profile',
    center: (<HeaderCellContent nickname="卡鲁秋" wxid={'微信号: kraskal'} />),
    right: (<img src={qrcode} />)
  }];

  const basicCells = [
    {
      image: require('./images/album.png'),
      link: '/wechat/self/album',
      center: (<p>相册</p>)
    },
    {
      image: require('./images/collect.png'),
      link: '/wechat/self/collect',
      center: (<p>收藏</p>)
    },
    {
      image: require('./images/wallet.png'),
      link: '/wechat/self/wallet',
      center: (<p>钱包</p>)
    },
    {
      image: require('./images/card.png'),
      link: '/wechat/self/card',
      center: (<p>卡券</p>)
    }
  ];

  const expressionCells = [
    {
      image: require('./images/expression.png'),
      link: '/wechat/self/expression',
      center: (<p>表情</p>)
    }
  ];

  const settingCells = [
    {
      image: require('./images/setting.png'),
      link: '/wechat/self/setting',
      center: (<p>设置</p>)
    }
  ];

  return (
    <div className="self-wrapper">
      <WcHeader title="我" />
      <WeuiCells cells={headerCells} />

      <WeuiCells cells={basicCells} />

      <WeuiCells cells={expressionCells} />

      <WeuiCells cells={settingCells} />
    </div>
  );
};

export default Self;
