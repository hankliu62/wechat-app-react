import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectAdvanced } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as homepageActions from '../../actions/homepage';
import ObjectUtils from '../../utils/ObjectUtils';

class Homepage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setState({ content: 'Modified Redux Content Data' });
    }, 3000);
  }

  render() {
    const { content } = this.props;

    return (
      <div className="homepage-main">{ content }</div>
    );
  }
}

const selectorFactory = (dispatch) => {
  let result = {};

  const homepageDispatchActions = bindActionCreators(homepageActions, dispatch);
  return (nextState, nextOwnProps) => {
    const content = nextState.homepage.content;
    const nextResult = { ...nextOwnProps, content, ...homepageDispatchActions };
    result = ObjectUtils.shallowEqual(result, nextResult) ? result : nextResult;
    return result;
  };
};

export default connectAdvanced(selectorFactory)(Homepage);
