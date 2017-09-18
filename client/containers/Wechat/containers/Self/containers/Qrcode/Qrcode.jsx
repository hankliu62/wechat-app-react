import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import debug from 'debug';

import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import WeuiQrcodeModal from '../../../../components/WeuiQrcodeModal/WeuiQrcodeModal';


const wechatSelfDebug = debug('wechat:self');

class Profile extends Component {
  static propTypes = {
    headerUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    qrcode: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    remark: PropTypes.string.isRequired,
    area: PropTypes.array
  }

  constructor(props) {
    super(props);

    wechatSelfDebug('Profile page init props: ', props);
  }

  render() {
    const { headerUrl, nickname, qrcode, gender, area, remark } = this.props;

    return (
      <div className="self-profile-wrapper">
        <WeuiHeader title="我的二维码" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">个人信息</span></WeuiBack>)} />

        <WeuiQrcodeModal
          isOpen
          qrcodeUrl={qrcode}
          headerUrl={headerUrl}
          nickname={nickname}
          remark={remark}
          gender={gender}
          areas={area}
          shouldCloseOnOverlayClick={false}
        />
      </div>
    );
  }
}

const selectorFactory = () => {
  let result = {};

  return (nextState, nextOwnProps) => {
    const { personal } = nextState.wechat;
    const nextResult = { ...nextOwnProps, ...personal };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Profile);
