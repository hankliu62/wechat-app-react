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
import WeuiMomentsAvatars from '../../../../components/WeuiMomentsAvatars/WeuiMomentsAvatars';
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
      [moment().format(DateYYYYMMDD)]: '今天',
      [moment().subtract(1, 'days').format(DateYYYYMMDD)]: '昨天'
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

  getCurrentYear = () => {
    return `${new Date().getFullYear()}`;
  }

  renderTodayPhotoGroup = () => {
    const groupOptions = {
      header: (
        <div className="moments-time-wrapper moments-time-diff-0">
          <p className="moments-day">今天</p>
        </div>
      ),
      body: (
        <img className="image-moments-photo" src={require('./images/photo.png')} />
      )
    };

    return (<MomentsGroupContent {...groupOptions} />);
  }

  renderDayMomentsGroupsWrapperBody = (post) => {
    const hasImages = !!(post.images && post.images.length !== 0);

    return (
      <div className={classNames('moments-content-wrapper', { 'without-images-moments': !hasImages })}>
        {
          hasImages && <WeuiMomentsAvatars images={post.images} />
        }
        <div className="content-wrapper-body">
          {
            !!post.content && <p className="content-body-text">{ post.content }</p>
          }
          {
            (hasImages && post.images.length > 1) && <p className="content-images-count">{ `共${post.images.length}张` }</p>
          }
        </div>
      </div>
    );
  }

  renderDayMomentsGroupsWrapper = (day, post, key) => {
    if (!post) {
      return null;
    }

    const groupOptions = {
      header: (
        <div className={classNames('moments-time-wrapper', `moments-time-diff-${moment().diff(moment(day), 'days')}`)}>
          <p className="moments-day">{ this.relativeDateKey[day] ? this.relativeDateKey[day] : post.day }</p>
          <p className="moments-month">{ `${post.month}月` }</p>
        </div>
      ),
      body: this.renderDayMomentsGroupsWrapperBody(post)
    };

    return (<MomentsGroupContent key={key} {...groupOptions} />);
  }

  renderYearMomentsStickyWrapper = (year, moments, index) => {
    const currentYear = this.getCurrentYear();

    let days;
    if (moments) {
      days = Object.keys(moments).sort();
    }

    if (year !== currentYear && !moments) {
      return null;
    }

    const currentDay = moment().format(DateYYYYMMDD);
    const currentDayIndex = days.indexOf(currentDay);
    if (currentDayIndex !== -1) {
      days.splice(currentDayIndex, index);
    }

    return (
      <StickyContainer className="weui-sticky-container" key={index}>
        <Sticky topOffset={this.getStickyTopOffset()}>
          {
            ({ isSticky, style }) => {
              return (
                <p
                  className={classNames('weui-sticky-header', { 'stickyed-header': isSticky })}
                  style={{ ...style, top: this.getStickyChildrenTop() }}
                >{`${year}年`}</p>
              );
            }
          }
        </Sticky>
        <div className="moments-groups-wrapper">
          {
            year === currentYear && !this.checkHasRouteParams() && this.renderTodayPhotoGroup()
          }
          {
            currentDayIndex !== -1 && moments[currentDay].map((post, subIndex) => this.renderDayMomentsGroupsWrapper(currentDay, post, `${currentDay}-${subIndex}`))
          }
        </div>
        {
          !!days.length && days.map((day, subIndex) => {
            return (
              <div className="moments-groups-wrapper" key={`moments-groups-wrapper-${subIndex}`}>
                {
                  moments[day].map((post, subSubIndex) => this.renderDayMomentsGroupsWrapper(day, post, `${day}-${subSubIndex}`))
                }
              </div>
            );
          })
        }
      </StickyContainer>
    );
  }

  renderMomentsWrapper = () => {
    const { momentsGroups } = this.getCurrentMoments() || {};
    if (!momentsGroups) {
      return null;
    }

    const currentYear = this.getCurrentYear();
    const years = Object.keys(momentsGroups).sort((pre, next) => next - pre) || [];
    if (!years.includes(currentYear)) {
      years.unshift(currentYear);
    }

    return (
      <section className="moments-wrapper">
        {
          !!years.length && years.map((year, index) => this.renderYearMomentsStickyWrapper(year, momentsGroups[year], index))
        }

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
