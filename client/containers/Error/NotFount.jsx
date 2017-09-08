import React from 'react';

const NotFount = (props) => {
  return (
    <div>
      <h3>No match for <code>{props.location.pathname}</code></h3>
    </div>
  );
};

export default NotFount;
