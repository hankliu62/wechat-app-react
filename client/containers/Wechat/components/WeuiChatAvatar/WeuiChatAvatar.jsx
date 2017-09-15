import React from 'react';
import { chunk } from 'lodash';

const WeuiChatAvatar = (props) => {
  const images = (props.images || []).slice(0, 9);
  images.reverse();
  const length = images.length;
  const columnCount = length > 4 ? 3 : Math.ceil(length / 2);
  const imagesGroups = chunk(images, columnCount);
  imagesGroups.reverse();

  return (
    <div className="weui-chat-avatar">
      {imagesGroups.map((groupImages, index) => {
        return (
          <div className="chat-avatar-group" key={`avatar-group$-${index}`}>
            { groupImages.map((image, innerIndex) => (<img src={image} key={`image${innerIndex}`} />))}
          </div>
        );
      })}
    </div>
  );
};

export default WeuiChatAvatar;
