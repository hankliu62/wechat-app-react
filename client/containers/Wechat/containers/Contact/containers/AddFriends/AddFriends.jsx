import React, { Component } from 'react';

import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';

class AddFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  render() {
    return (
      <div className="contact-add-friends-wrapper">
        <WeuiHeader title="添加朋友" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">通讯录</span></WeuiBack>)} />
        Add Friends
      </div>
    );
  }
}

export default AddFriends;
