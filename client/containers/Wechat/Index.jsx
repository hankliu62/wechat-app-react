import React from 'react';

import Routes from './routes/index';
import FooterContainer from './containers/FooterContainer/FooterContainer';

const WechatContainer = props => (
  <FooterContainer {...props}>
    <Routes {...props} />
  </FooterContainer>
);

export default WechatContainer;
