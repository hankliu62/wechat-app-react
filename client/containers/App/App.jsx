import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import LifeCycle from '../../test/components/LifeCycle/LifeCycle.jsx';

class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     content: 'life cycle component props content 0'
  //   };
  // }

  // onChangeContent = () => {
  //   const { content: preContent } = this.state;

  //   const nextContent = preContent.replace(/(\d+)/, (search, group) => parseInt(group, 10) + 1);
  //   console.log(nextContent, '-----------------');

  //   this.setState({ content: nextContent });
  // }

  render() {
    const { children } = this.props;
    // const { content } = this.state;

    return (
      <div className="app-main">
        {/* <LifeCycle content={ content } onChangeContent={ this.onChangeContent } /> */}
        { children && children }
      </div>
    );
  }
}

export default App;
