import React, { Component } from 'react';
import classNames from 'classnames';

import WcFooter from '../../components/WcFooter/WcFooter';

import './Container.less';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      welcome: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ welcome: false });
    }, 2000);
  }

  render() {
    const { otherProps, children } = this.props;

    return (
      <div className="wechat-container">
        {children && children}
        <section className={classNames('wx-welcome', { hidden: !this.state.welcome })} />
        <WcFooter {...otherProps} />
      </div>
    );
  }
}

export default Container;
