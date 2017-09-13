import React from 'react';

import Container from '../Container/Container';
import WeuiFooter from '../../components/WeuiFooter/WeuiFooter';

const FooterContainer = (props) => {
  const { otherProps, children } = props;

  return (
    <Container>
      {children && children}
      <WeuiFooter {...otherProps} />
    </Container>
  );
};

export default FooterContainer;
