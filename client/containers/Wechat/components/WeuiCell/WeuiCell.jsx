import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './WeuiCell.less';

const WeuiCellHd = (props) => {
  return (<div className="weui-cell-hd">{props.left && props.left}</div>);
};

const WeuiCellBd = (props) => {
  return (<div className="weui-cell-bd">{props.center}</div>);
};

const WeuiCellFt = (props) => {
  return (<div className="weui-cell-ft">{props.right && props.right}</div>);
};

const WeuiCell = (props) => {
  const extendClass = { [props.className]: !!props.className };
  if (props.link) {
    return (
      <Link to={props.link || ''} className={classNames('weui-cell clickable', extendClass)} >
        <WeuiCellHd left={props.left} />
        <WeuiCellBd center={props.center} />
        <WeuiCellFt right={props.right} />
      </Link>
    );
  }

  const linkOptions = {};
  if (props.onClick) {
    linkOptions.onClick = props.onClick;
    extendClass.clickable = true;
  }

  return (
    <div {...linkOptions} className={classNames('weui-cell', extendClass)} >
      <WeuiCellHd left={props.left} />
      <WeuiCellBd center={props.center} />
      <WeuiCellFt right={props.right} />
    </div>
  );
};

export default WeuiCell;
