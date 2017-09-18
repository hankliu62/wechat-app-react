import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import ObjectUtils from '../../../../utils/ObjectUtils';
import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';
import * as selfActions from '../../actions/self';
import CheckRoute from '../../decorators/CheckRoute';

import './Self.less';

const HeaderCellContent = props => (
  <div className="header-cell-center">
    <h4 className="self-nickname">{props.nickname}</h4>
    <p className="self-wxid">{props.wxid}</p>
  </div>
);

@CheckRoute
class Self extends Component {
  static propTypes = {
    headerUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    wxid: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.checkIsSubRoute = this.checkIsSubRoute.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setState({ content: 'Modified Redux Content Data' });
    }, 3000);
  }

  render() {
    const { headerUrl, nickname, wxid, children } = this.props;

    const headerCells = [{
      className: 'header-weui-cell with-arrow',
      left: (<img src={headerUrl} />),
      link: '/wechat/self/profile',
      center: (<HeaderCellContent nickname={nickname} wxid={`微信号: ${wxid}`} />),
      right: (<img src={require('./images/qrcode.png')} />)
    }];

    const basicCells = [
      {
        className: 'with-arrow',
        left: (<img src={require('./images/collect.png')} />),
        link: '/wechat/self/collect',
        center: (<p>收藏</p>)
      },
      {
        className: 'with-arrow',
        left: (<img src={require('./images/album.png')} />),
        link: '/wechat/self/album',
        center: (<p>相册</p>)
      },
      {
        className: 'with-arrow',
        left: (<img src={require('./images/card.png')} />),
        link: '/wechat/self/cards',
        center: (<p>卡包</p>)
      },
      {
        className: 'with-arrow',
        left: (<img src={require('./images/expression.png')} />),
        link: '/wechat/self/expression',
        center: (<p>表情</p>)
      }
    ];

    const walletCells = [
      {
        className: 'with-arrow',
        left: (<img src={require('./images/wallet.png')} />),
        link: '/wechat/self/wallet',
        center: (<p>钱包</p>)
      }
    ];

    const settingCells = [
      {
        className: 'with-arrow',
        left: (<img src={require('./images/setting.png')} />),
        link: '/wechat/self/setting',
        center: (<p>设置</p>)
      }
    ];

    return (
      <div className={classNames('self-wrapper', { 'with-sub-wrapper without-footer-wrapper': this.checkIsSubRoute() })}>
        <div className="sub-main-wrapper self-main-wrapper">
          <WeuiHeader title="我" />
          <WeuiCells cells={headerCells} />

          <WeuiCells cells={walletCells} />

          <WeuiCells cells={basicCells} />

          <WeuiCells cells={settingCells} />
        </div>

        { children && children }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const selfDispatchActions = bindActionCreators(selfActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { personal } = nextState.wechat;
    const nextResult = { ...nextOwnProps, ...personal, ...selfDispatchActions };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Self);
