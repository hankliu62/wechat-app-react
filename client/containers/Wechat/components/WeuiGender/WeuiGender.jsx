import React from 'react';
import classNames from 'classnames';

import * as CONSTANTS from '../../constants/Constants';

import './WeuiGender.less';

const WeuiGender = (props) => {
  if (![CONSTANTS.FEMALE, CONSTANTS.MALE].includes(props.gender)) {
    return null;
  }

  return (
    <span className={classNames('weui-gender', { [props.gender]: !!props.gender })} />
  );
};

export default WeuiGender;
