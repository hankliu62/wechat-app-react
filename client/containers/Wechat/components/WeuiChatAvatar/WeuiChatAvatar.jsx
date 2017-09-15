import React from 'react';
import classNames from 'classnames';
import { chunk } from 'lodash';

import './WeuiChatAvatar.less';

const WeuiChatAvatar = (props) => {
  const images = (props.images || []).slice(0, 9);
  images.reverse();
  const length = images.length;
  const columnCount = length > 4 ? 3 : Math.ceil(length / 2);
  const imagesGroups = chunk(images, columnCount);
  imagesGroups.reverse();

  return (
    <div className={classNames('weui-chat-avatar', `weui-chat-avatar-${length}`)}>
      {
        imagesGroups.map((groupImages, index) => {
          return (
            <div className="chat-avatar-group" key={`avatar-group$-${index}`}>
              { groupImages.map((image, innerIndex) => (<img className={classNames('chat-avatar', `chat-avatar-${length}`)} src={image} key={`image${innerIndex}`} />))}
            </div>
          );
        })
      }
    </div>
  );
};

export default WeuiChatAvatar;
