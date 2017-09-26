import React from 'react';
import { Switch } from 'react-router-dom';


import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import SubPageContainer from '../containers/SubPageContainer/SubPageContainer';

const WechatExploreRouter = (props) => {
  const loadExploreScanAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore/Scan' */ '../containers/Explore/containers/Scan/Scan.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/explore/scan" load={loadExploreScanAsync} />
    </Switch>
  );
};

export default WechatExploreRouter;
