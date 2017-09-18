import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiSearchBar from '../../../../components/WeuiSearchBar/WeuiSearchBar';
// import { Sticky, StickyContainer } from 'react-sticky';

import './NewFriends.less';

class NewFriends extends Component {
  handleRouteToAddFriends = () => {
    this.props.history.push('/wechat/contact/add-friends');
  }

  getGroupAddedFriends = () => {

  }

  renderAddedFriendsSticky = () => {

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

        New Friends
      </div>
    );
  }
}

export default NewFriends;
