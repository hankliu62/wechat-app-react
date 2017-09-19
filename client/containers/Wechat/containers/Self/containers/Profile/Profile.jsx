import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
// import { bindActionCreators } from 'redux';
import debug from 'debug';
import classNames from 'classnames';

import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiCells from '../../../../components/WeuiCells/WeuiCells';
// import * as selfActions from '../../../../actions/self';
import CheckRoute from '../../../../decorators/CheckRoute';

import './Profile.less';

const wechatSelfDebug = debug('wechat:self');

@CheckRoute
class Profile extends Component {
  static propTypes = {
    headerUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    wxid: PropTypes.string.isRequired
    // setState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isShowQrcode: true
    };

    wechatSelfDebug('Profile page init props: ', props);
    this.checkIsSubRoute = this.checkIsSubRoute.bind(this);
  }

  handleOpenQrcodeModel = () => {
    this.setState({ isShowQrcode: true });
  }

  handleCloseQrcodeModel = () => {
    this.setState({ isShowQrcode: false });
  }

  render() {
    const { headerUrl, nickname, wxid, children } = this.props;

    const basicCells = [
      {
        className: 'with-arrow',
        left: (<p className="profile-cell-label">头像</p>),
        link: '/wechat/self/profile/avatar',
        right: (<img className="profile-header-avatar" src={headerUrl} />)
      },
      {
        className: 'with-arrow',
        left: (<p className="profile-cell-label">名字</p>),
        link: '/wechat/self/profile/name',
        right: (<p className="profile-cell-content">{ nickname }</p>)
      },
      {
        left: (<p className="profile-cell-label">微信号</p>),
        right: (<p className="profile-cell-content">{ wxid }</p>)
      },
      {
        className: 'with-arrow',
        left: (<p className="profile-cell-label">我的二维码</p>),
        link: '/wechat/self/profile/qrcode',
        right: (<img className="profile-qrcode" src={require('./images/qrcode.png')} />)
      },
      {
        className: 'with-arrow',
        left: (<p className="profile-cell-label">更多</p>),
        link: '/wechat/self/profile/more'
      }
    ];

    const addressCells = [
      {
        className: 'with-arrow',
        left: (<p className="profile-cell-label">我的地址</p>),
        link: '/wechat/self/profile/address',
      }
    ];

    return (
      <div className={classNames('self-profile-wrapper', { 'with-second-sub-wrapper': this.checkIsSubRoute() })}>
        <div className="second-sub-main-wrapper">
          <WeuiHeader title="个人中心" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />

          <WeuiCells cells={basicCells} />

          <WeuiCells cells={addressCells} />
        </div>

        { children && children }
      </div>
    );
  }
}

const selectorFactory = () => {
  let result = {};

  // const selfDispatchActions = bindActionCreators(selfActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { selfMain = {} } = nextState.wechat;
    const { personal = {} } = selfMain;
    const nextResult = { ...nextOwnProps, ...personal };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Profile);
