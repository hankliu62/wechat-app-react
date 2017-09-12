import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';

import WcHeader from '../../components/WcHeader/WcHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';
import * as contactActions from '../../actions/contact';
import ObjectUtils from '../../../../utils/ObjectUtils';

import './Self.less';

const HeaderCellContent = props => (
  <div className="header-cell-center">
    <h4 className="self-nickname">{props.nickname}</h4>
    <p className="self-wxid">{props.wxid}</p>
  </div>
);

class Self extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    contacts: PropTypes.array.isRequired,
    setState: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log(this.props.content);
    console.log(this.props.contacts);
    setTimeout(() => {
      this.props.setState({ content: 'Modified Redux Content Data' });
    }, 3000);
  }

  render() {
    const headerCells = [{
      className: 'weui-cell-access header-weui-cell',
      image: require('./images/avatar.png'),
      link: '/wechat/self/profile',
      center: (<HeaderCellContent nickname="卡鲁秋" wxid={'微信号: kraskal'} />),
      right: (<img src={require('./images/qrcode.png')} />)
    }];

    const basicCells = [
      {
        image: require('./images/collect.png'),
        link: '/wechat/self/collect',
        center: (<p>收藏</p>)
      },
      {
        image: require('./images/album.png'),
        link: '/wechat/self/album',
        center: (<p>相册</p>)
      },
      {
        image: require('./images/card.png'),
        link: '/wechat/self/card',
        center: (<p>卡包</p>)
      },
      {
        image: require('./images/expression.png'),
        link: '/wechat/self/expression',
        center: (<p>表情</p>)
      }
    ];

    const walletCells = [
      {
        image: require('./images/wallet.png'),
        link: '/wechat/self/wallet',
        center: (<p>钱包</p>)
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

        <WeuiCells cells={walletCells} />

        <WeuiCells cells={basicCells} />

        <WeuiCells cells={settingCells} />
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  return (nextState, nextOwnProps) => {
    console.log(nextState);
    const contacts = nextState.wechat.contact.contacts;
    const content = nextState.wechat.contact.content;
    const nextResult = { ...nextOwnProps, contacts, content, ...contactDispatchActions };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Self);
