import React from 'react';

import WeuiCell from '../WeuiCell/WeuiCell';

import './WeuiCells.less';

const WeuiCells = props => (
  <div className="weui-cells">
    {
      props.cells && props.cells.map((item, index) => (<WeuiCell key={index} {...item} />))
    }
  </div>
);

export default WeuiCells;
