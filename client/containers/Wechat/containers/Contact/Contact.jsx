import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';

import WcHeader from '../../components/WcHeader/WcHeader';
import WeuiCells from '../../components/WeuiCells/WeuiCells';
import * as contactActions from '../../actions/contact';
import ObjectUtils from '../../../../utils/ObjectUtils';

import './Contact.less';

class Contact extends Component {
  static propTypes = {
    contacts: PropTypes.object.isRequired,
    letters: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    setState: PropTypes.func.isRequired
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setState({ content: 'Modified Redux Content Data' });
    }, 3000);
  }

  renderContactFrinedsGroup = (letter, index) => {
    const { contacts } = this.props;

    const frineds = contacts[letter] ? contacts[letter].map(frined => ({
      image: frined.headerUrl,
      link: '/wechat/contact/details',
      center: (<p>{frined.remark || frined.nickname}</p>)
    })) : [];

    return (
      <li className="contact-frineds-group" key={index}>
        <p className="contact-alpha">{letter}</p>
        <WeuiCells cells={frineds} />
      </li>
    );
  }

  renderLettersAnchorBar = () => {
    const { letters } = this.props;
    return (
      <ul className="anchor-bar">
        {
          letters.map((item, index) => (<li className="letter-anchor" key={index}>{item}</li>))
        }
      </ul>
    );
  }

  render() {
    const { letters, total } = this.props;

    const headerCells = [
      {
        image: require('./images/contact-friend-notify.png'),
        link: '/wechat/contact/new-friends',
        center: (<p>新的朋友</p>)
      },
      {
        image: require('./images/contact-addgroup.png'),
        link: '/wechat/contact/group-chats',
        center: (<p>群聊</p>)
      },
      {
        image: require('./images/contact-tag.png'),
        link: '/wechat/contact/tags',
        center: (<p>标签</p>)
      },
      {
        image: require('./images/contact-offical.png'),
        link: '/wechat/contact/official-accounts',
        center: (<p>公众号</p>)
      }
    ];
    return (
      <div className="contact-wrapper">
        <WcHeader title="通讯录">+</WcHeader>
        <WeuiCells cells={headerCells} />

        <ul className="contact-frineds">
          {
            letters.map((letter, index) => this.renderContactFrinedsGroup(letter, index))
          }
        </ul>
        <p className="contact-frineds-statistics">{`${total}位联系人`}</p>

        {this.renderLettersAnchorBar()}
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  return (nextState, nextOwnProps) => {
    const contacts = nextState.wechat.contact.contactGroups;
    const letters = nextState.wechat.contact.contactLetters;
    const total = (nextState.wechat.contact.contacts || []).length;
    const nextResult = { ...nextOwnProps, contacts, letters, total, ...contactDispatchActions };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Contact);
