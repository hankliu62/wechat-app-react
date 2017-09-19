import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import debug from 'debug';

import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiAvatarModal from '../../../../components/WeuiAvatarModal/WeuiAvatarModal';


const wechatSelfDebug = debug('wechat:self');

class Profile extends Component {
  static propTypes = {
    headerUrl: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    wechatSelfDebug('Profile page init props: ', props);
  }

  render() {
    const { headerUrl } = this.props;

    return (
      <div className="self-profile-wrapper">
        <WeuiHeader title="个人头像" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">个人信息</span></WeuiBack>)} />

        <WeuiAvatarModal
          isOpen
          headerUrl={headerUrl}
        />
      </div>
    );
  }
}

const selectorFactory = () => {
  let result = {};

  return (nextState, nextOwnProps) => {
    const { selfMain = {} } = nextState.wechat;
    const { personal = {} } = selfMain;
    const nextResult = { ...nextOwnProps, ...personal };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Profile);
