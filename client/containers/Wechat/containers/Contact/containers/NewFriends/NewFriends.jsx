import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Sticky, StickyContainer } from 'react-sticky';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import classNames from 'classnames';


import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiSearchBar from '../../../../components/WeuiSearchBar/WeuiSearchBar';
import WeuiCells from '../../../../components/WeuiCells/WeuiCells';
import WeuiContactName from '../../../../components/WeuiContactName/WeuiContactName';
import WeuiBtn from '../../../../components/WeuiBtn/WeuiBtn';
import * as newFriendsActions from '../../../../actions/new-friends';
import GetStickyPostion from '../../../../decorators/GetStickyPostion';
import * as Constants from '../../../../constants/Constants';

import './NewFriends.less';

const NewFriendGroupCenter = (props) => {
  return (
    <div className="new-friend-group-center">
      <WeuiContactName {...props} />
      <p className="new-friend-group-message">{props.messages && props.messages.length ? last(props.messages) : ''}</p>
    </div>
  );
};

const NewFriendGroupRight = (props) => {
  const handleClickAccept = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (props.onClickAccept) {
      props.onClickAccept();
    }
  };

  const handleClickAdd = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (props.onClickAdd) {
      props.onClickAdd();
    }
  };
  switch (+props.status) {
    case Constants.CONSTANT_ADD_STATUS_ACCEPT:
      return (<p className="new-friend-status status-accept">已添加</p>);
    case Constants.CONSTANT_ADD_STATUS_AWAIT:
      return (<WeuiBtn className="new-friend-status status-await" theme="primary" size="sm" onClick={handleClickAccept}>接受</WeuiBtn>);
    case Constants.CONSTANT_ADD_STATUS_EXPIRE:
      return (<p className="new-friend-status status-expire">已过期</p>);
    case Constants.CONSTANT_ADD_STATUS_REFUSE:
      return (<p className="new-friend-status status-refuse">已过期</p>);
    default:
      return (<WeuiBtn className="new-friend-status status-other" theme="default" size="sm" onClick={handleClickAdd}>添加</WeuiBtn>);
  }
};

@GetStickyPostion()
class NewFriends extends Component {
  static propTypes = {
    newFriends: PropTypes.array,
    newFriendsGroups: PropTypes.object,
    newFriendsGroupsKeys: PropTypes.array,
    fetchNewFriends: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.getStickyTopOffset = this.getStickyTopOffset.bind(this);
    this.getStickyChildrenTop = this.getStickyChildrenTop.bind(this);
  }

  componentDidMount() {
    if (!this.props.newFriends) {
      this.props.fetchNewFriends();
    }
  }

  handleRouteToAddFriends = () => {
    this.props.history.push('/wechat/add-friend');
  }

  getStickyContainerCells = (key) => {
    const { newFriendsGroups } = this.props;

    const friends = newFriendsGroups[key] ? newFriendsGroups[key].map(friend => ({
      left: (<img className="new-friend-group-avatar" src={friend.headerUrl} />),
      center: (<NewFriendGroupCenter {...friend} />),
      right: (<NewFriendGroupRight status={friend.status} />),
      link: `/wechat/contact/detail/${friend.wxid}`
    })) : [];

    return friends;
  }

  renderAddedFriendsSticky = () => {
    const { newFriendsGroups, newFriendsGroupsKeys } = this.props;
    if (isEmpty(newFriendsGroups)) {
      return null;
    }

    return (
      <ul className="contact-frineds">
        {
          newFriendsGroupsKeys.map((key, index) => (
            <StickyContainer className="contact-friends-group" key={index}>
              <Sticky topOffset={this.getStickyTopOffset()}>
                {
                  ({ isSticky, style }) => {
                    return (
                      <p
                        className={classNames('contact-alpha', { 'stickyed-friend': isSticky })}
                        style={{ ...style, top: this.getStickyChildrenTop() }}
                      >{key}</p>
                    );
                  }
                }
              </Sticky>
              <WeuiCells cells={this.getStickyContainerCells(key)} />
            </StickyContainer>
          ))
        }
      </ul>

    );
  }

  render() {
    return (
      <div className="contact-new-friends-wrapper">
        <WeuiHeader title="新的朋友" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)}>
          <p className="link-header-operation" onClick={this.handleRouteToAddFriends}>添加朋友</p>
        </WeuiHeader>

        <WeuiSearchBar placeholder="微信号/手机号" />

        <div className="telephone-contact-panel">
          <i className="iconfont icon-iphone-address" />
          <p className="telephone-contact-desc">添加手机联系人</p>
        </div>

        { this.renderAddedFriendsSticky() }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const newFriendsDispatchActions = bindActionCreators(newFriendsActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { newFriendsMain = {} } = nextState.wechat;
    const { newFriends, newFriendsGroups, newFriendsGroupsKeys } = newFriendsMain;

    const nextResult = {
      ...nextOwnProps,
      newFriends,
      newFriendsGroups,
      newFriendsGroupsKeys,
      ...newFriendsDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(NewFriends);
