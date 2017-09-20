import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Sticky, StickyContainer } from 'react-sticky';
import classNames from 'classnames';

import ObjectUtils from '../../../../../../utils/ObjectUtils';
import WeuiHeader from '../../../../components/WeuiHeader/WeuiHeader';
import WeuiBack from '../../../../components/WeuiBack/WeuiBack';
import * as momentsActions from '../../../../actions/moments';
import * as selfActions from '../../../../actions/self';
import * as albumActions from '../../../../actions/album';
import CheckRoute from '../../../../decorators/CheckRoute';
import GetStickyPostion from '../../../../decorators/GetStickyPostion';
import { DateYYYYMMDD } from '../../../../constants/Times';

import './Album.less';

const MomentsGroupContent = (props) => {
  return (
    <section className="moments-group-wrapper">
      <div className="moments-group-header">
        { props.header && props.header }
      </div>
      <div className="moments-group-body">
        { props.body && props.body }
      </div>
    </section>
  );
};

@CheckRoute
@GetStickyPostion()
class Album extends Component {
  static propTypes = {
    wxid: PropTypes.string,
    personal: PropTypes.object,
    friend: PropTypes.object,
    moments: PropTypes.object,
    fetchMoments: PropTypes.func.isRequired,
    fetchPersonal: PropTypes.func.isRequired,
    fetchFriend: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      show: true
    };

    this.relativeDateKey = {
      [moment().format(DateYYYYMMDD)]: '今天'
    };

    this.checkHasRouteParams = this.checkHasRouteParams.bind(this);
    this.getStickyTopOffset = this.getStickyTopOffset.bind(this);
    this.getStickyChildrenTop = this.getStickyChildrenTop.bind(this);
  }

  componentDidMount() {
    if (this.checkHasRouteParams()) {
      if (!this.props.friend) {
        this.props.fetchFriend(this.props.match.params.wxid);
      }
    } else if (!this.wxid) {
      this.props.fetchPersonal();
    }

    const wxid = this.getCurrentWxid();
    if (!this.getCurrentMoments()) {
      this.props.fetchMoments(wxid);
    }
  }

  getCurrentMoments = () => {
    const wxid = this.getCurrentWxid();

    if (!this.props.moments) {
      return null;
    }

    return this.props.moments[wxid];
  }

  getCurrentWxid = () => {
    return this.props.match.params.wxid || this.props.wxid;
  }

  renderTodayPhotoGroup = () => {
    const groupOptions = {
      header: (
        <div className="moments-time-wrapper moments-time-diff-0">
          <p className="moments-month">今天</p>
        </div>
      ),
      body: (
        <img className="image-moments-photo" src={require('./images/photo.png')} />
      )
    };

    return (<MomentsGroupContent {...groupOptions} />);
  }

  renderMomentsWrapper = () => {
    const { momentsGroups } = this.getCurrentMoments() || {};
    if (!momentsGroups) {
      return null;
    }

    return (
      <section className="moments-wrapper">
        <StickyContainer className="weui-sticky-container">
          <Sticky topOffset={this.getStickyTopOffset()}>
            {
              ({ isSticky, style }) => {
                return (
                  <p
                    className={classNames('weui-sticky-header', { 'stickyed-header': isSticky })}
                    style={{ ...style, top: this.getStickyChildrenTop() }}
                  >{`${new Date().getFullYear()}年`}</p>
                );
              }
            }
          </Sticky>
          <div className="moments-groups-wrapper">
            {
              !this.checkHasRouteParams() && this.renderTodayPhotoGroup()
            }
            {

            }
          </div>
        </StickyContainer>
      </section>
    );
  }

  render() {
    const { personal, friend } = this.props;

    const contact = this.checkHasRouteParams() ? friend : personal;

    if (!contact) {
      return null;
    }

    return (
      <div className="self-album-wrapper">
        <WeuiHeader title="相册" back={(<WeuiBack history={this.props.history}><span className="weui-back-centent">我</span></WeuiBack>)} />
        <div className="album-cover-wrapper" style={{ backgroundImage: `url(${contact.coverUrl})` }}>
          <div className="album-personal-wrapper">
            <div className="album-avatar"><img className="image-header" src={contact.headerUrl} /></div>
            <div className="album-nickname">{contact.nickname}</div>
          </div>
        </div>
        <p className="album-personal-signature">{ contact.signature }</p>
        { this.renderMomentsWrapper() }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const selfDispatchActions = bindActionCreators(selfActions, dispatch);
  const momentsDispatchActions = bindActionCreators(momentsActions, dispatch);
  const albumDispatchActions = bindActionCreators(albumActions, dispatch);

  return (nextState, nextOwnProps) => {
    const { selfMain = {}, momentsMain: moments, albumMain } = nextState.wechat;
    const { personal } = selfMain;
    const { friend } = albumMain;
    const wxid = personal ? personal.wxid : '';
    const nextResult = {
      ...nextOwnProps,
      wxid,
      personal,
      friend,
      moments,
      ...selfDispatchActions,
      ...momentsDispatchActions,
      ...albumDispatchActions
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Album);
