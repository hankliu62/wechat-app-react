import React from 'react';
import { Switch } from 'react-router-dom';


import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import SubPageContainer from '../containers/SubPageContainer/SubPageContainer';


const WechatToolsRouter = (props) => {
  const loadToolsIconFontsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Tools/IconFonts' */ '../containers/Tools/containers/IconFonts/IconFonts.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/tools/iconfonts" load={loadToolsIconFontsAsync} />
    </Switch>
  );
};

export default WechatToolsRouter;
