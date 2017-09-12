import React from 'react';
import classNames from 'classnames';

import WcHeader from '../../components/WcHeader/WcHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';
import NewMsg from '../../components/NewMsg/NewMsg';

import './Explore.less';

const NewMomentsAvatar = props => (
  <div className={classNames('new-moments', { hidden: !props.avatar })}>
    <img src={props.avatar} />
    <NewMsg type="dot" />
  </div>
);

const Explore = (props) => {
  const headerCells = [{
    className: 'weui-cell-access header-weui-cell',
    image: require('./images/moments.png'),
    link: '/wechat/explore/moments',
    center: (<p>朋友圈</p>),
    right: (<NewMomentsAvatar avatar={props.avatar || require('./images/avatar.png')} />)
  }];

  const findCells = [
    {
      image: require('./images/scan.png'),
      link: '/wechat/explore/scan',
      center: (<p>扫一扫</p>)
    },
    {
      image: require('./images/shake.png'),
      link: '/wechat/explore/shake',
      center: (<p>摇一摇</p>)
    }
  ];

  const bottleCells = [
    {
      image: require('./images/bottle.png'),
      link: '/wechat/explore/bottle',
      center: (<p>漂流瓶</p>)
    }
  ];

  const amusementCells = [
    {
      image: require('./images/shopping.png'),
      link: '/wechat/explore/shopping',
      center: (<p>购物</p>)
    },
    {
      image: require('./images/game.png'),
      link: '/wechat/explore/game',
      center: (<p>游戏</p>)
    }
  ];

  return (
    <div className="explore-wrapper">
      <WcHeader title="发现" />

      <WeuiCells cells={headerCells} />

      <WeuiCells cells={findCells} />

      <WeuiCells cells={bottleCells} />

      <WeuiCells cells={amusementCells} />
    </div>
  );
};

export default Explore;
