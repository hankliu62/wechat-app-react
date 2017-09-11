import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './WeuiCell.less';

const WeuiCell = props => (
  <Link to={props.link} className={classNames('weui-cell', { [props.className]: !!props.className })}>
    {
      props.image && (
        <div className="weui-cell-hd">
          <img src={props.image} />
        </div>
      )
    }
    <div className="weui-cell-bd">{props.center}</div>
    { props.right && (<div className="weui-cell-ft">{props.right}</div>) }
  </Link>
);

export default WeuiCell;
