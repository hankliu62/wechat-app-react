import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './WeuiCell.less';

const WeuiCell = props => (
  <Link to={props.link} className={classNames('weui-cell', { [props.className]: !props.className })}>
    <div className="weui-cell-hd">
      <img src={`./images/${props.image}`} />
    </div>
    <div className="weui-cell-bd">{props.content}</div>
    <div className="weui-cell-ft">
      { props.children && props.children }
    </div>
  </Link>
);

export default WeuiCell;
