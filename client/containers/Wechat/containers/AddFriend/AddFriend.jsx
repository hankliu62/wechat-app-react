import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';

import ObjectUtils from '../../../../utils/ObjectUtils';
import * as addFriendActions from '../../actions/add-friend';
import { fetchPersonal } from '../../actions/self';
import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../components/WeuiBack/WeuiBack';
import WeuiSearchBar from '../../components/WeuiSearchBar/WeuiSearchBar';
import WeuiQrcodeModal from '../../components/WeuiQrcodeModal/WeuiQrcodeModal';
import WeuiCells from '../../components/WeuiCells/WeuiCells';

import './AddFriend.less';

const AddFriendWayCellsCenter = (props) => {
  return (
    <div className="add-friend-way-center">
      <p className="add-friend-way-title">{props.title || ''}</p>
      <p className="add-friend-way-desc">{props.desc || ''}</p>
    </div>
  );
};

class AddFriend extends Component {
  static propTypes = {
    personal: PropTypes.object,
    searchKey: PropTypes.string,
    setState: PropTypes.func.isRequired,
    searchAddFriend: PropTypes.func.isRequired,
    fetchPersonal: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpenQrcodeModal: false
    };
  }

  componentDidMount() {
    if (!this.props.personal) {
      this.props.fetchPersonal();
    }

    this.props.setState({ searchKey: '' });
  }

  handleSearchFriend = () => {
    const { searchKey, history } = this.props;

    this.props.searchAddFriend(history.push, searchKey);
  }

  handleClickOpenQrcodeModal = () => {
    this.setState({ isOpenQrcodeModal: true });
  }

  handleClickCloseQrcodeModal = () => {
    this.setState({ isOpenQrcodeModal: false });
  }

  renderAddFriendWaysCells = () => {
    const addWaysCells = [
      {
        className: 'with-arrow',
        left: (<img className="add-friend-way-icon" src={require('./images/add-friend-radar.png')} />),
        link: '/wechat/add-friend/radar',
        center: (<AddFriendWayCellsCenter title="雷达加朋友" desc="添加身边的朋友" />),
      },
      {
        className: 'with-arrow',
        left: (<img className="add-friend-way-icon" src={require('./images/add-friend-addgroup.png')} />),
        link: '/wechat/add-friend/addgroup',
        center: (<AddFriendWayCellsCenter title="面对面建群" desc="与身边的朋友进入同一个群聊" />),
      },
      {
        className: 'with-arrow',
        left: (<img className="add-friend-way-icon" src={require('./images/add-friend-scanqr.png')} />),
        link: '/wechat/add-friend/scanqr',
        center: (<AddFriendWayCellsCenter title="扫一扫" desc="扫描二维码名片" />),
      },
      {
        className: 'with-arrow',
        left: (<img className="add-friend-way-icon" src={require('./images/add-friend-contacts.png')} />),
        link: '/wechat/add-friend/contacts',
        center: (<AddFriendWayCellsCenter title="手机联系人" desc="添加通讯录中的朋友" />),
      },
      {
        className: 'with-arrow',
        left: (<img className="add-friend-way-icon" src={require('./images/add-friend-offical.png')} />),
        link: '/wechat/add-friend/offical',
        center: (<AddFriendWayCellsCenter title="公众号" desc="获取更多资讯和服务" />),
      }
    ];

    return (<WeuiCells cells={addWaysCells} />);
  }

  render() {
    const { personal = {} } = this.props;
    return (
      <div className="add-friend-wrapper">
        <WeuiHeader title="添加朋友" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)} />

        <WeuiSearchBar placeholder="微信号/手机号" />
        <div className="personal-info-box" >
          <span className="personal-wxid-title">我的微信号: </span>
          <span className="personal-wxid-content">{personal.wxid}</span>
          <img className="icon-personal-qrcode" src={require('./images/add-friend-my-qr.png')} onClick={this.handleClickOpenQrcodeModal} />
        </div>

        { this.renderAddFriendWaysCells() }

        {
          personal.wxid &&
            <WeuiQrcodeModal
              isOpen={this.state.isOpenQrcodeModal}
              qrcodeUrl={personal.qrcode}
              headerUrl={personal.headerUrl}
              nickname={personal.nickname}
              remark={personal.remark}
              gender={personal.gender}
              areas={personal.area}
              shouldCloseOnOverlayClick
              onRequestClose={this.handleClickCloseQrcodeModal}
              overlayStyle={{ zIndex: 100 }}
            />
        }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const addFriendDispatchActions = bindActionCreators(addFriendActions, dispatch);
  const fetchPersonalDispatchAction = bindActionCreators(fetchPersonal, dispatch);
  return (nextState, nextOwnProps) => {
    const { addFriendMain = {}, selfMain = {} } = nextState.wechat;
    const { personal } = selfMain;
    const nextResult = {
      ...nextOwnProps,
      ...addFriendMain,
      personal,
      wxid: (personal || {}).wxid,
      ...addFriendDispatchActions,
      fetchPersonal: fetchPersonalDispatchAction
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(AddFriend);
