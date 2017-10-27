import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Circle.less';

class Circle extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    strokeHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    strokeColor(props, propName, componentName) {
      if (props[propName] && !/^#[a-zA-Z0-9]{3}([a-zA-Z0-9]{3})?$/.test(props[propName])) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
        );
      }
    }
  }

  static defaultProps = {
    size: 100,
    percent: 0,
    strokeHeight: 10,
    strokeColor: '#5cb85c'
  }

  constructor(props) {
    super(props);

    this.state = {
      waiting: true,
    };
  }

  componentDidMount() {
    this.setTransformRotateZ(this.props.percent, true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.percent !== this.props.percent) {
      const waiting = !!((nextProps.percent > 50 && this.props.percent < 50) || (nextProps.percent < 50 && this.props.percent > 50));
      this.setState({ waiting }, () => this.setTransformRotateZ(nextProps.percent));
    }
  }

  transformCircle = (dynamicLeftValue, dynamicLeftPercent, dynamicRightValue) => {
    if (this.leftCircle && this.rightCircle) {
      this.leftCircle.style.transform = `rotateZ(${dynamicLeftValue}deg)`;
      // this.leftCircle.style.transitionDuration = `${dynamicLeftPercent / 100}s`;
      this.rightCircle.style.transform = `rotateZ(${dynamicRightValue}deg)`;
    }
  }

  setTransformRotateZ = (percent, shouldAsync = false) => {
    let dynamicLeftPercent = percent > 50 ? (percent - 50) * 2 : 0;
    let dynamicRightPercent = percent < 50 ? percent * 2 : 100;

    dynamicLeftPercent = dynamicLeftPercent < 0 ? 0 : dynamicLeftPercent;
    dynamicLeftPercent = dynamicLeftPercent > 100 ? 100 : dynamicLeftPercent;
    dynamicRightPercent = dynamicRightPercent < 0 ? 0 : dynamicRightPercent;

    const dynamicLeftValue = 180 + (1.8 * dynamicLeftPercent);
    const dynamicRightValue = 180 + (1.8 * dynamicRightPercent);

    if (shouldAsync) {
      setTimeout(() => this.transformCircle(dynamicLeftValue, dynamicLeftPercent, dynamicRightValue), 0);
    } else {
      this.transformCircle(dynamicLeftValue, dynamicLeftPercent, dynamicRightValue);
    }
  }

  render() {
    const { percent, strokeColor, children, size, strokeHeight } = this.props;

    const leftCircleStyle = { width: `${size / 2}px`, height: `${size}px`, borderRadius: `${size / 2}px 0 0 ${size / 2}px` };
    const rightCircleStyle = { width: `${size / 2}px`, height: `${size}px`, borderRadius: `0 ${size / 2}px ${size / 2}px 0` };
    const strokeStyle = { backgroundColor: strokeColor };

    const maskStyle = {
      width: `${size - (2 * strokeHeight)}px`,
      height: `${size - (2 * strokeHeight)}px`,
      lineHeight: `${size - (2 * strokeHeight)}px`,
      left: `${strokeHeight}px`,
      top: `${strokeHeight}px`,
    };
    const pathwayStyle = {
      width: `${size - (strokeHeight / 2 * 3)}px`,
      height: `${size - (strokeHeight / 2 * 3)}px`,
      borderWidth: `${strokeHeight / 2}px`,
      left: `${strokeHeight / 4}px`,
      top: `${strokeHeight / 4}px`
    };
    const circleContentStyle = {
      width: `${(Math.sqrt(2) * size / 2) - (Math.sqrt(2) * strokeHeight)}px`,
      height: `${(Math.sqrt(2) * size / 2) - (Math.sqrt(2) * strokeHeight)}px`,
      left: `${((2 - Math.sqrt(2)) * size / 4) + (Math.sqrt(2) / 2 * strokeHeight)}px`,
      top: `${((2 - Math.sqrt(2)) * size / 4) + (Math.sqrt(2) / 2 * strokeHeight)}px`
    };
    const contentPercentStyle = {
      lineHeight: `${(Math.sqrt(2) * size / 2) - (Math.sqrt(2) * strokeHeight)}px`
    };

    return (
      <div className="hl-circle" style={{ width: `${size}px`, height: `${size}px` }}>
        <div className={classNames('hl-circle-left', { 'waiting-animation': this.state.waiting })} style={leftCircleStyle}>
          <div className="stroke" ref={el => this.leftCircle = el} style={strokeStyle} />
        </div>
        <div className="hl-circle-right" style={rightCircleStyle}>
          <div className="stroke" ref={el => this.rightCircle = el} style={strokeStyle} />
        </div>
        <div className="hl-circle-mask" style={maskStyle} />
        <div className="hl-circle-pathway" style={pathwayStyle} />
        <div className="hl-circle-content" style={circleContentStyle}>
          { !children && <div className="content-percent" style={contentPercentStyle}>{ `${percent}%` }</div>}
          { children && children }
        </div>
      </div>
    );
  }
}

export default Circle;
