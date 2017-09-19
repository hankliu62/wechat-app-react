import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import ObjectUtils from '../../../../utils/ObjectUtils';
import * as contactActions from '../../actions/contact';
import * as chatActions from '../../actions/chat';

import './Container.less';

class Container extends Component {
  static propTypes = {
    contacts: PropTypes.array,
    chats: PropTypes.array,
    fetchContacts: PropTypes.func.isRequired,
    fetchChats: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      welcome: false
    };
  }

  componentDidMount() {
    if (!this.props.contacts) {
      this.props.fetchContacts();
    }

    if (!this.props.chats) {
      this.props.fetchChats();
    }

    setTimeout(() => {
      this.setState({ welcome: false });
    }, 2000);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="wechat-container">
        {children && children}
        <div className={classNames('wx-welcome', { hidden: !this.state.welcome })} />
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const contactDispatchActions = bindActionCreators(contactActions, dispatch);
  const chatDispatchActions = bindActionCreators(chatActions, dispatch);
  return (nextState, nextOwnProps) => {
    const { contactMain = {}, chatMain = {} } = nextState.wechat;
    const { contacts } = contactMain;
    const { chats } = chatMain;

    const nextResult = {
      ...nextOwnProps,
      contacts,
      chats,
      fetchContacts: contactDispatchActions.fetchContacts,
      fetchChats: chatDispatchActions.fetchChats
    };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Container);
