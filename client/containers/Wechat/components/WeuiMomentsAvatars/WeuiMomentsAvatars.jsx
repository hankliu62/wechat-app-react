import React from 'react';
import classNames from 'classnames';
import { chunk } from 'lodash';

import './WeuiMomentsAvatars.less';

const WeuiMomentsAvatars = (props) => {
  const images = (props.images || []).slice(0, 4);
  images.reverse();
  const length = images.length;
  const chunkCount = length > 2 ? 2 : 1;
  const imagesGroups = chunk(images, chunkCount);
  imagesGroups.reverse();

  return (
    <div className={classNames('weui-moments-avatar', `weui-moments-avatar-${length}`)}>
      {
        imagesGroups.map((groupImages, index) => {
          groupImages.reverse();

          return (
            <div className={classNames('moments-avatar-group', `moments-avatar-group-${groupImages.length}`)} key={`avatar-group$-${index}`}>
              {
                groupImages.map((image, innerIndex) => (
                  <div className={classNames('moments-avatar', `moments-avatar-${length}`)} style={{ backgroundImage: `url(${image})` }} key={`image${innerIndex}`} />
                ))
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default WeuiMomentsAvatars;
