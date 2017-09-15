import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

class NewFriends extends Component {
  handleRouteToAddFriends = () => {
    this.props.history.push('/wechat/contact/add-friends');
  }

  render() {
    return (
      <div className="contact-new-friends-wrapper">
        <WeuiHeader title="新的朋友" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)}>
          <p className="link-header-operation" onClick={this.handleRouteToAddFriends}>添加朋友</p>
        </WeuiHeader>
        New Friends
      </div>
    );
  }
}

export default NewFriends;
