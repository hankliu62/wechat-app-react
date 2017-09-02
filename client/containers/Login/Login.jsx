import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLang } from 'redux-pagan';

import * as loginActions from '../../actions/login';
import ObjectUtils from '../../utils/ObjectUtils';

import './Login';

class Login extends Component {
  static propTypes = {
    // content: PropTypes.string.isRequired,
    // setState: PropTypes.func.isRequired,
    i18n: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log(123);
  }

  render() {
    const { i18n } = this.props;
    return (
      <div className="login-main">
        <div className="login-mask">
          <div className="background-mask" />
        </div>
        <div className="center-box-container">
          <section className="box-header signup">
            <header className="signup-header">{ i18n('signup', 'title') }</header>
            <div className="signup-body">
              <div className="signup-avatar" />
              <div className="signup-link">{ i18n('signup', 'newAccount') }</div>
              <div className="signup-tip">{ i18n('signup', 'tip') }{ i18n('signup', 'userAgreement') }</div>
            </div>
          </section>
          <section className="box-body signin" />
        </div>
      </div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const loginDispatchActions = bindActionCreators(loginActions, dispatch);
  return (nextState, nextOwnProps) => {
    const loginState = nextState.login;
    const i18n = getLang(nextState.i18n, 'app');
    const nextResult = { ...nextOwnProps, ...loginState, i18n, ...loginDispatchActions };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Login);
