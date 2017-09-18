import React from 'react';
import { Switch } from 'react-router-dom';


import BundleWrappingRoute from '../../../components/BundleWrappingRoute/BundleWrappingRoute';
import SubPageContainer from '../containers/SubPageContainer/SubPageContainer';
import SecondSubPageContainer from '../containers/SecondSubPageContainer/SecondSubPageContainer';

const WechatSelfRouter = (props) => {
  const loadSelfProfileAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Profile' */ '../containers/Self/containers/Profile/Profile.jsx');
  const loadSelfWalletAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Wallet' */ '../containers/Self/containers/Wallet/Wallet.jsx');
  const loadSelfCollectAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Collect' */ '../containers/Self/containers/Collect/Collect.jsx');
  const loadSelfAlbumAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Album' */ '../containers/Self/containers/Album/Album.jsx');
  const loadSelfCardsAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Cards' */ '../containers/Self/containers/Cards/Cards.jsx');
  const loadSelfExpressionAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Expression' */ '../containers/Self/containers/Expression/Expression.jsx');
  const loadSelfSettingAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Setting' */ '../containers/Self/containers/Setting/Setting.jsx');

  return (
    <Switch>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/profile" load={loadSelfProfileAsync}>
        {
          (nextProps) => {
            const loadSelfProfileQrcodeAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Qrcode' */ '../containers/Self/containers/Qrcode/Qrcode.jsx');
            const loadSelfProfileAvatarAsync = () => import(/* webpackChunkName: 'containers/Wechat/Self/Avatar' */ '../containers/Self/containers/Avatar/Avatar.jsx');

            return (
              <Switch>
                <BundleWrappingRoute {...nextProps} component={SecondSubPageContainer} path="/wechat/self/profile/qrcode" load={loadSelfProfileQrcodeAsync} />
                <BundleWrappingRoute {...nextProps} component={SecondSubPageContainer} path="/wechat/self/profile/avatar" load={loadSelfProfileAvatarAsync} />
              </Switch>
            );
          }
        }
      </BundleWrappingRoute>
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/wallet" load={loadSelfWalletAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/collect" load={loadSelfCollectAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/album" load={loadSelfAlbumAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/cards" load={loadSelfCardsAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/expression" load={loadSelfExpressionAsync} />
      <BundleWrappingRoute {...props} component={SubPageContainer} path="/wechat/self/setting" load={loadSelfSettingAsync} />
    </Switch>
  );
};

export default WechatSelfRouter;
