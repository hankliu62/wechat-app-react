import React from 'react';
import { Switch } from 'react-router-dom';


import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import SubPageContainer from '../containers/SubPageContainer/SubPageContainer';

const WechatExploreRouter = (props) => {
  const loadExploreScanAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore/Scan' */ '../containers/Explore/containers/Scan/Scan.jsx');
  const loadExploreBottleAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore/Bottle' */ '../containers/Explore/containers/Bottle/Bottle.jsx');
  const loadExploreShakeAsync = () => import(/* webpackChunkName: 'containers/Wechat/Explore/Shake' */ '../containers/Explore/containers/Shake/Shake.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/explore/scan" load={loadExploreScanAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/explore/bottle" load={loadExploreBottleAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/explore/shake" load={loadExploreShakeAsync} />
    </Switch>
  );
};

export default WechatExploreRouter;
