import React, { Component } from 'react';
import classNames from 'classnames';

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
    const { children } = this.props;

    return (
      <div className="wechat-container">
        {children && children}
        <section className={classNames('wx-welcome', { hidden: !this.state.welcome })} />
      </div>
    );
  }
}

export default Container;
