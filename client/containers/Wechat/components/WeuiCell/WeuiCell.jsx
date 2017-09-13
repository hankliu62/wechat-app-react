import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './WeuiCell.less';

const WeuiCell = (props) => {
  if (props.link) {
    return (
      <Link to={props.link || ''} className={classNames('weui-cell', { [props.className]: !!props.className })} >
        {
          props.image && (
            <div className="weui-cell-hd">
              <img src={props.image} />
            </div>
          )
        }
        <div className="weui-cell-bd">{props.center}</div>
        <div className="weui-cell-ft">{props.right && props.right}</div>
      </Link>
    );
  }

  const linkOptions = {};
  if (props.onClick) {
    linkOptions.onClick = props.onClick;
  }

  return (
    <div {...linkOptions} className={classNames('weui-cell', { [props.className]: !!props.className })} >
      {
        props.image && (
          <div className="weui-cell-hd">
            <img src={props.image} />
          </div>
        )
      }
      <div className="weui-cell-bd">{props.center}</div>
      <div className="weui-cell-ft">{props.right && props.right}</div>
    </div>
  );
};

export default WeuiCell;
