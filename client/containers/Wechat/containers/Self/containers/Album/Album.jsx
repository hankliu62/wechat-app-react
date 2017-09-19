import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';

import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import * as momentsActions from '../../../../actions/moments';
import * as selfActions from '../../../../actions/self';

import './Album.less';

class Album extends Component {
  static propTypes = {
    wxid: PropTypes.string.isRequired,
    headerUrl: PropTypes.string.isRequired,
    homeUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    moments: PropTypes.object,
    fetchMoments: PropTypes.func.isRequired,
    fetchPersonal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  componentDidMount() {
    if (!this.props.wxid) {
      this.props.fetchPersonal();
    }

    if (!this.props.moments || !this.props.moments[this.props.wxid]) {
      this.props.fetchMoments(this.props.wxid);
    }
  }

  render() {
    return (
      <div className="self-album-wrapper">
        <WeuiHeader title="相册" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        <div className="home-bg" style={{ backgroundImage: `url(${this.props.homeUrl})` }}>
          <div className="home-pic-base">
            <div className="album-avatar"><img src={this.props.headerUrl} /></div>
            <div className="album-nickname">{this.props.nickname}</div>
          </div>
        </div>
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const selfDispatchActions = bindActionCreators(selfActions, dispatch);
  const momentsDispatchActions = bindActionCreators(momentsActions, dispatch);

  return (nextState, nextOwnProps) => {
    const { selfMain = {} } = nextState.wechat;
    const { personal = {} } = selfMain;
    const nextResult = {
      ...nextOwnProps,
      ...personal,
      ...selfDispatchActions,
      ...momentsDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Album);
