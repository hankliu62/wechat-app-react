import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

class GroupChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="contact-group-chats-wrapper">
        <WeuiHeader title="群聊" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)} />
        Group Chats
      </div>
    );
  }
}

export default GroupChats;
