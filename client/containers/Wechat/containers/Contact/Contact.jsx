import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Sticky, StickyContainer } from 'react-sticky';
// import ReactMixin from 'react-mixin';
import classNames from 'classnames';

import ObjectUtils from '../../../../utils/ObjectUtils';
import ElementUtil from '../../../../utils/ElementUtil';
import WeuiHeader from '../../components/WeuiHeader/WeuiHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';
import WeuiSearchBar from '../../components/WeuiSearchBar/WeuiSearchBar';
import * as contactActions from '../../actions/contact';
import CheckRoute from '../../decorators/CheckRoute';
import { HEADER_HEIGHT } from '../../constants/Constants';

import './Contact.less';

@CheckRoute
class Contact extends Component {
  static propTypes = {
    contacts: PropTypes.object.isRequired,
    letters: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    setState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      fontSize: 40,
      stickyLetter: ''
    };
  }


  componentDidMount() {
    this.props.setState({ content: 'Modified Redux Content Data' });
    const fontSize = (ElementUtil.getElementStyle(document.documentElement, 'font-size') || '16px').replace('px', '');
    this.setState({ fontSize });
  }

  onClickFriend = friend => () => {
    this.props.setState({ selectedContacter: friend });
    this.props.history.push(`/wechat/contact/detail/${friend.wxid}`);
  }

  onClickAddFriend = () => {
    this.props.history.push('/wechat/contact/add-friends');
  }

  renderContactFriendsGroup = (letter, index) => {
    const { contacts } = this.props;

    const friends = contacts[letter] ? contacts[letter].map(friend => ({
      left: (<img src={friend.headerUrl} />),
      center: (<p>{friend.remark || friend.nickname}</p>),
      onClick: this.onClickFriend(friend)
    })) : [];

    return (
      <StickyContainer className="contact-friends-group" key={index}>
        <Sticky topOffset={-(((HEADER_HEIGHT + 0.56) * this.state.fontSize) - 2)}>
          {
            ({ isSticky, style }) => {
              return (
                <p className={classNames('contact-alpha', { sticky: isSticky })} style={{ ...style, top: (HEADER_HEIGHT * this.state.fontSize) - 2 }}>{letter}</p>
              );
            }
          }
        </Sticky>
        <WeuiCells cells={friends} />
      </StickyContainer>
    );
  }

  renderLettersAnchorBar = () => {
    const { letters } = this.props;
    return (
      <ul className="anchor-bar">
        {
          letters.map((item, index) => (<li className={classNames('letter-anchor', { sticky: this.stickyLetter === item })} key={index}>{item}</li>))
        }
      </ul>
    );
  }

  render() {
    const { letters, total, children } = this.props;

    const headerCells = [
      {
        left: (<img src={require('./images/contact-friend-notify.png')} />),
        link: '/wechat/contact/new-friends',
        center: (<p>新的朋友</p>)
      },
      {
        left: (<img src={require('./images/contact-addgroup.png')} />),
        link: '/wechat/contact/group-chats',
        center: (<p>群聊</p>)
      },
      {
        left: (<img src={require('./images/contact-tag.png')} />),
        link: '/wechat/contact/tags',
        center: (<p>标签</p>)
      },
      {
        left: (<img src={require('./images/contact-offical.png')} />),
        link: '/wechat/contact/official-accounts',
        center: (<p>公众号</p>)
      }
    ];

    return (
      <div className={classNames('contact-wrapper', { 'sub-wrapper without-footer-wrapper': this.checkIsSubRoute.call(this) })}>
        <div className="contact-main-wrapper">
          <WeuiHeader title="通讯录">
            <i className="icon-header-operation iconfont icon-tips-add-friend" onClick={this.onClickAddFriend} />
          </WeuiHeader>

          <WeuiSearchBar />

          <WeuiCells cells={headerCells} />

          <ul className="contact-frineds">
            {
              letters.map((letter, index) => this.renderContactFriendsGroup(letter, index))
            }
          </ul>
          <p className="contact-frineds-statistics">{`${total}位联系人`}</p>

          {this.renderLettersAnchorBar()}
        </div>

        { children && children }
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { selectedContacter, contactLetters: letters, contactGroups, contacts = [] } = nextState.wechat.contact;
    const total = contacts.length;
    const pushState = bindActionCreators(push, dispatch);
    const nextResult = {
      ...nextOwnProps,
      contacts:
      contactGroups,
      letters,
      total,
      selectedContacter,
      ...contactDispatchActions,
      pushState
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Contact);
