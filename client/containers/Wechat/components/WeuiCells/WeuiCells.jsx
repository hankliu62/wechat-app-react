import React from 'react';
import classNames from 'classnames';

import WeuiCell from '../WeuiCell/WeuiCell';

import './WeuiCells.less';

const WeuiCells = props => (
  <div className={classNames('weui-cells', { [props.className]: !!props.className })}>
    {
      props.cells && props.cells.map((item, index) => (<WeuiCell key={index} {...item} />))
    }
  </div>
);

export default WeuiCells;
