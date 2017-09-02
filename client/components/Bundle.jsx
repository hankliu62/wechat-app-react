import { Component } from 'react';

export default class Bundle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mod: null,
      mount: true
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  shouldComponentUpdate() {
    if (this.state.mod) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this.state.mount = false;
  }

  load(props) {
    this.setState({
      mod: null
    });

    props.load().then((mod) => {
      if (this.state.mount) {
        this.setState({
          mod: mod.default ? mod.default : mod
        });
      }
    });
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}
