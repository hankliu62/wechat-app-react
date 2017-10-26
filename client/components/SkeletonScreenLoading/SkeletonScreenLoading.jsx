import React from 'react';
import './SkeletonScreenLoading.less';

const SkeletonScreenLoading = () => (
  <div className="hl-skeleton-loading">
    <div className="hl-background-masker header-top" />
    <div className="hl-background-masker header-left" />
    <div className="hl-background-masker header-right" />
    <div className="hl-background-masker header-bottom" />
    <div className="hl-background-masker subheader-left" />
    <div className="hl-background-masker subheader-right" />
    <div className="hl-background-masker subheader-bottom" />
  </div>
);

export default SkeletonScreenLoading;
