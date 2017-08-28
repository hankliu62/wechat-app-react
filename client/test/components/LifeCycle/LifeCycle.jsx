import React, { Component, PropTypes } from 'react';

class LifeCycle extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onChangeContent: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {};

    console.log('LifeCycle: constructor function, arguments: ', arguments);
  }

  // This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.
  // getDefaultProps() {
  //   // 初始化属性
  //   console.log('LifeCycle: getDefaultProps function, arguments: ', arguments);
  //   return {};
  // }

  getInitialState() {
    // 初始化状态
    console.log('LifeCycle: getInitialState function, arguments: ', arguments);
    return {};
  }


  componentWillMount() {
    // 组件第一次渲染之前调用
    // 在这里可以做一个对默认属性，默认状态，和组件渲染之前的逻辑操作
    console.log('LifeCycle: componentWillMount function, arguments: ', arguments);
  }

  componentDidMount(props) {
    // 组件第一次渲染之后调用
    // 根据业务场景而定，如果有操作在此函数中处理即可
    const test = (this.state.test || 0) + 1;
    this.setState({ test });
    console.log('LifeCycle: componentDidMount function, arguments: ', arguments);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // 当组件中的默认属性props发生了变化，此方法被调用到（props改变）
    console.log('LifeCycle: componentWillReceiveProps function, arguments: ', arguments);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 组件接收到新的props或者state的时候调用，此函数返回值决定着原来的组件结构是否重新渲染（props或者state改变）
    console.log('LifeCycle: shouldComponentUpdate function, arguments: ', arguments);
    return true;
  }

  componentWillUpdate() {
    // 组件第二次渲染之前调用，当属性props或者状态state发生变化时，渲染之前调用（props或者state改变）
    console.log('LifeCycle: componentWillUpdate function, arguments: ', arguments);
  }

  componentDidUpdate() {
    // 组件第二次渲染之后调用，当属性props或者状态state发生变化时，渲染之后调用（props或者state改变）
    console.log('LifeCycle: componentDidUpdate function, arguments: ', arguments);
  }

  componentWillUnmount() {
    // 组件销毁时调用
    console.log('LifeCycle: componentWillUnmount function, arguments: ', arguments);
  }

  render() {
    // 渲染组件，此操作会生成一个虚拟DOM存在内存中（第一次渲染，props或者state改变）
    console.log('LifeCycle: render function, arguments: ', arguments);
    return (
      <div className="life-cycle-content">
        This is life cycle component
        <div className="content-wrapper">{ this.props.content }</div>
        <button className="change-props" onClick={ this.props.onChangeContent }>Change Content Props</button>
      </div>
    );
  }
}

export default LifeCycle;
