import React, { Component } from 'react';
import classNames from 'classnames';

import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';
import WeuiBadge from '../../components/WeuiBadge/WeuiBadge';
import CheckRoute from '../../decorators/CheckRoute';

import './Explore.less';

const WeuiBadgeMomentsAvatar = props => (
  <div className={classNames('new-moments', { hidden: !props.avatar })}>
    <img src={props.avatar} />
    <WeuiBadge type="dot" />
  </div>
);

@CheckRoute
class Explore extends Component {
  constructor(props) {
    super(props);

    this.checkIsSubRoute = this.checkIsSubRoute.bind(this);
  }

  render() {
    const headerCells = [{
      className: 'with-arrow',
      left: (<img src={require('./images/moments.png')} />),
      link: '/wechat/explore/moments',
      center: (<p>朋友圈</p>),
      right: (<WeuiBadgeMomentsAvatar avatar={this.props.avatar || require('./images/avatar.png')} />)
    }];

    const findCells = [
      {
        className: 'with-arrow',
        left: (<img src={require('./images/scan.png')} />),
        link: '/wechat/explore/scan',
        center: (<p>扫一扫</p>)
      },
      {
        className: 'with-arrow',
        left: (<img src={require('./images/shake.png')} />),
        link: '/wechat/explore/shake',
        center: (<p>摇一摇</p>)
      }
    ];

    const bottleCells = [
      {
        className: 'with-arrow',
        left: (<img src={require('./images/bottle.png')} />),
        link: '/wechat/explore/bottle',
        center: (<p>漂流瓶</p>)
      }
    ];

    const amusementCells = [
      {
        className: 'with-arrow',
        left: (<img src={require('./images/shopping.png')} />),
        link: '/wechat/explore/shopping',
        center: (<p>购物</p>)
      },
      {
        className: 'with-arrow',
        left: (<img src={require('./images/game.png')} />),
        link: '/wechat/explore/game',
        center: (<p>游戏</p>)
      }
    ];

    const { children, location } = this.props;
    const subPathname = location.pathname.split('/').pop();

    return (
      <div
        className={classNames('explore-wrapper', {
          'with-sub-wrapper without-footer-wrapper': this.checkIsSubRoute(),
          [`${subPathname}-parent-explore-wrapper`]: this.checkIsSubRoute()
        })}
      >
        <div className="sub-main-wrapper explore-main-wrapper">
          <WeuiHeader title="发现" />

          <WeuiCells cells={headerCells} />

          <WeuiCells cells={findCells} />

          <WeuiCells cells={bottleCells} />

          <WeuiCells cells={amusementCells} />
        </div>

        { children && children }
      </div>
    );
  }
}

export default Explore;
