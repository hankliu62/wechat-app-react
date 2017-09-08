import React from 'react';

import Routes from './routes/index';
import Container from './containers/Container/Container';

const WechatContainer = props => (
  <Container {...props}>
    <Routes {...props} />
  </Container>
);

export default WechatContainer;
